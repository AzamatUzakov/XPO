export const prerender = false;

import type { APIRoute } from "astro";
import { isValidPhoneNumber } from "libphonenumber-js";

const NAME_RE = /^[A-Za-zА-ЯЁа-яёÀ-ÿ]+([\s-][A-Za-zА-ЯЁа-яёÀ-ÿ]+)+$/;

const SERVICES = [
    "Авиафрахт",
    "Морской фрахт",
    "Автомобильные перевозки",
    "Железнодорожные перевозки",
    "Мультимодальные перевозки",
];

function escapeMd(s: string) {
    return s.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}

export const POST: APIRoute = async ({ request }) => {
    let body: { name?: string; phone?: string; serviceType?: string };

    try {
        const raw = await request.text();
        body = JSON.parse(raw);
    } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const { name, phone, serviceType } = body;

    // server-side валидация — не доверяем клиенту
    if (typeof name !== "string" || !NAME_RE.test(name.trim())) {
        return new Response(JSON.stringify({ error: "Некорректное имя" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    if (typeof phone !== "string" || !phone.trim().startsWith("+")) {
        return new Response(
            JSON.stringify({ error: "Укажите номер с кодом страны, например +998..." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    let isPhoneValid = false;
    try {
        isPhoneValid = isValidPhoneNumber(phone.trim());
    } catch {
        isPhoneValid = false;
    }

    if (!isPhoneValid) {
        return new Response(JSON.stringify({ error: "Некорректный телефон" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    if (typeof serviceType !== "string" || !SERVICES.includes(serviceType)) {
        return new Response(JSON.stringify({ error: "Некорректный тип услуги" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        return new Response(JSON.stringify({ error: "Telegram не настроен" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    const text =
        `📦 *Новая заявка с сайта*\n\n` +
        `👤 Имя: ${escapeMd(name.trim())}\n` +
        `📞 Телефон: ${escapeMd(phone.trim())}\n` +
        `🚚 Услуга: ${escapeMd(serviceType)}`;

    let tgResponse: Response;
    try {
        tgResponse = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: "MarkdownV2",
                }),
            }
        );
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        return new Response(
            JSON.stringify({ error: "Failed to reach Telegram API", detail: msg }),
            { status: 502, headers: { "Content-Type": "application/json" } }
        );
    }

    if (!tgResponse.ok) {
        const errText = await tgResponse.text();
        return new Response(
            JSON.stringify({
                error: `Telegram error ${tgResponse.status}`,
                detail: errText.slice(0, 500),
            }),
            { status: 502, headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};