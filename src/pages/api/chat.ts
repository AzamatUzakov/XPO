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
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "No messages" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = import.meta.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 1024,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: `Groq error ${response.status}`, detail: errText }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      const reader = response.body!.getReader();
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
            if (data === "[DONE]") continue;

            try {
              const json = JSON.parse(data);
              const text: string = json.choices?.[0]?.delta?.content ?? "";
              if (text) {
                await writer.write(
                  encoder.encode(`data: ${JSON.stringify({ delta: { text } })}\n\n`)
                );
              }
            } catch {
              // пропускаем
            }
          }
        }
        await writer.write(encoder.encode("data: [DONE]\n\n"));
      } catch (e) {
        console.error("[chat.ts] Stream error:", e);
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
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[chat.ts] Error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};