export const prerender = false;

import type { APIRoute } from "astro";
import { isValidPhoneNumber } from "libphonenumber-js";

const NAME_RE = /^[A-Za-zА-ЯЁа-яёÀ-ÿ]+([\s-][A-Za-zА-ЯЁа-яёÀ-ÿ]+)+$/;

import { translations } from "../../lib/i18n";

const SERVICES = Array.from(
    new Set(
        Object.values(translations).flatMap((locale) => (locale.contact?.serviceOptions ?? []))
    )
);

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
        return new Response(JSON.stringify({ errorCode: "invalid_name", error: "Invalid name" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    if (typeof phone !== "string" || !phone.trim().startsWith("+")) {
        return new Response(
            JSON.stringify({ errorCode: "invalid_phone_prefix", error: "Phone number must include country code, e.g. +998..." }),
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
        return new Response(JSON.stringify({ errorCode: "invalid_phone", error: "Invalid phone number" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    if (typeof serviceType !== "string" || !SERVICES.includes(serviceType)) {
        return new Response(JSON.stringify({ errorCode: "invalid_service_type", error: "Invalid service type" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        return new Response(JSON.stringify({ errorCode: "telegram_not_configured", error: "Telegram is not configured" }), {
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
            JSON.stringify({ errorCode: "telegram_api_error", error: "Failed to reach Telegram API", detail: msg }),
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