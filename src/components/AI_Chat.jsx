
import { useState, useRef, useEffect } from "react";

export default function AI_Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Здравствуйте! Я помощник по международным перевозкам. Чем могу помочь?",
      uiOnly: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    // Фильтруем uiOnly-сообщения перед добавлением нового
    const historyMessages = messages.filter((m) => !m.uiOnly);
    const updatedMessages = [...historyMessages, userMessage];

    setMessages((prev) => [...prev.filter((m) => !m.uiOnly), userMessage, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Добавляем чанк в буфер — чтобы не ломаться на разрезанных строках
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        // Последнюю незавершённую строку оставляем в буфере
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            // Anthropic SSE: тип события content_block_delta содержит delta.text
            const delta = json.delta?.text ?? "";
            if (delta) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: updated[updated.length - 1].content + delta,
                };
                return updated;
              });
            }
          } catch {
            // Пропускаем нераспознанные события (ping, message_start и т.д.)
          }
        }
      }
    } catch (e) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `Ошибка: ${e.message || "Попробуйте ещё раз."}`,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-3  bottom-[12px] md:right-7 md:bottom-10 z-50">
      {isOpen && (
        <div
          className="absolute bottom-20 right-0 w-80 rounded-2xl overflow-hidden flex flex-col"
          style={{
            height: "420px",
            background: "rgba(22,28,48,0.97)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
            animation: "chatOpen 0.25s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-white text-sm font-medium">AI Ассистент</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 cursor-pointer text-2xl hover:text-white/80 transition-colors  leading-none"
            >
              ×
            </button>
          </div>

          <div data-lenis-prevent className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                  style={{
                    background:
                      msg.role === "user"
                        ? "rgba(99,102,241,0.85)"
                        : "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  {msg.content || (
                    <span className="opacity-50 italic">Печатает...</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div
            className="px-3 py-3 flex gap-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <input
              className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              placeholder="Напишите вопрос..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{
                background:
                  loading || !input.trim()
                    ? "rgba(99,102,241,0.3)"
                    : "rgba(99,102,241,0.85)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div
        className="relative w-16 h-16 cursor-pointer group"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              animation: `ripple 2.4s ease-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}

        <div
          className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full border border-black/10 group-hover:bg-[rgba(40,50,80,0.95)] transition-all duration-200"
          style={{
            background: "rgba(40,50,80,0.82)",
            boxShadow: "0 4px 16px rgba(40,50,80,0.22)",
            animation: "pulseIcon 2s ease-in-out infinite",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <span
          className="absolute -top-0.5 -right-0.5 z-[9] w-5 h-5 rounded-full"
          style={{
            background: "rgba(232,64,64,0.4)",
            animation: "badgeRipple 2s ease-out infinite 0.5s",
          }}
        />

        {!isOpen && (
          <span
            className="absolute -top-0.5 -right-0.5 z-10 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold text-white"
            style={{
              background: "#e84040",
              border: "2px solid #ffffff",
              animation: "badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            1
          </span>
        )}
      </div>

      <style>{`
        @keyframes ripple {
          0%   { box-shadow: 0 0 0 0px rgba(55,65,100,0.4); opacity: 1; }
          100% { box-shadow: 0 0 0 22px rgba(55,65,100,0); opacity: 0; }
        }
        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.08); }
        }
        @keyframes badgePop {
          0%   { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes badgeRipple {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes chatOpen {
          0%   { transform: scale(0.85) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}