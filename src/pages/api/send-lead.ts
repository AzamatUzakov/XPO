// src/pages/api/send-lead.ts
import type { APIRoute } from "astro";

export const prerender = false;

// --- Простой in-memory rate limiter (работает только на single-instance Node сервере) ---
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 минута
const RATE_LIMIT_MAX_REQUESTS = 3; // максимум 3 заявки в минуту с одного IP

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) || [];

  // оставляем только запросы внутри окна
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

// периодическая очистка старых записей, чтобы Map не разрастался бесконечно
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of requestLog.entries()) {
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) requestLog.delete(ip);
    else requestLog.set(ip, recent);
  }
}, 5 * 60 * 1000);

// --- Защита от дублей (тот же номер подряд) ---
const lastSubmissions = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 30 * 1000; // 30 секунд

function isDuplicate(phone: string): boolean {
  const now = Date.now();
  const last = lastSubmissions.get(phone);
  if (last && now - last < DUPLICATE_WINDOW_MS) return true;
  lastSubmissions.set(phone, now);
  return false;
}

// --- Валидация номера ---
function isValidPhone(phone: string): boolean {
  const cleaned = phone.trim();
  // допускает +, цифры, пробелы, дефисы, скобки, длина 7-20 символов
  const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
  return phoneRegex.test(cleaned);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = await request.json();
    const phone = body?.phone;
    const honeypot = body?.website; // скрытое поле-приманка
    const startedAt = body?.startedAt; // timestamp когда форма была показана

    // 1. Honeypot — если заполнено, это бот
    if (honeypot) {
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Проверка скорости заполнения формы (боты отправляют почти мгновенно)
    if (startedAt && Date.now() - Number(startedAt) < 1500) {
      return new Response(
        JSON.stringify({ error: "Too fast" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Базовая проверка типа и формата
    if (!phone || typeof phone !== "string" || !isValidPhone(phone)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Rate limiting по IP
    const ip = clientAddress || "unknown";
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests, please try again later" }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5. Защита от дублей
    if (isDuplicate(phone.trim())) {
      return new Response(
        JSON.stringify({ error: "Duplicate submission" }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = import.meta.env.TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return new Response(
        JSON.stringify({ error: "Server misconfigured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const text = `📦 Новая заявка на ранний доступ (CRM)\nТелефон: ${phone.trim()}`;

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );

    const data = await tgResponse.json();

    if (!data.ok) {
      return new Response(
        JSON.stringify({ error: "Telegram error" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};