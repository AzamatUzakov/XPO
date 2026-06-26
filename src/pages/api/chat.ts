export const prerender = false;

import type { APIRoute } from "astro";

const SYSTEM_PROMPT = `Ты — помощник логистической компании. 
Отвечаешь на вопросы о международных грузоперевозках: 
таможня, инкотермс, документы, маршруты, сроки, стоимость.
Отвечай кратко и по делу. Язык ответа — язык вопроса.`;

export const POST: APIRoute = async ({ request }) => {
  let messages;
  try {
    const body = await request.text();
    const parsed = JSON.parse(body);
    messages = parsed.messages;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "No messages" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const apiKey = import.meta.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }

  const contents = messages.map(
    ({ role, content }: { role: string; content: string }) => ({
      role: role === "assistant" ? "model" : "user",
      parts: [{ text: content }],
    })
  );

  let geminiResponse: Response;
  try {
    geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 1024 },
        }),
      }
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: "Failed to reach Gemini API", detail: msg }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ДИАГНОСТИКА: всегда показываем статус от Gemini
  if (!geminiResponse.ok) {
    const errText = await geminiResponse.text();
    // Фиксируем статус на 502 чтобы не форвардить коды Gemini (403, 404 и т.д.)
    return new Response(
      JSON.stringify({
        error: `Gemini error ${geminiResponse.status}`,
        detail: errText.slice(0, 500),
      }),
      {
        status: 502, // ← ИСПРАВЛЕНО: всегда 502, не geminiResponse.status
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  (async () => {
    const reader = geminiResponse.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (!data) continue;

          try {
            const json = JSON.parse(data);
            const text: string = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
            if (text) {
              await writer.write(
                encoder.encode(`data: ${JSON.stringify({ delta: { text } })}\n\n`)
              );
            }
          } catch {
            // Пропускаем нераспознанные события
          }
        }
      }
      await writer.write(encoder.encode("data: [DONE]\n\n"));
    } catch {
      // Поток завершился
    } finally {
      writer.close();
    }
  })();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
