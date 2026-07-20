import { NextResponse } from "next/server";

const MAX_LEN = { name: 100, contact: 150, message: 2000 };
const MAX_BODY_BYTES = 10_000;
const ALLOWED_ORIGINS = new Set(["https://megaumka.dev"]);

// Name is a person's name: letters, spaces, hyphens, apostrophes. Nothing else.
const NAME_PATTERN = /^[\p{L}\s'-]+$/u;
// Message allows normal writing punctuation but blocks characters that have no
// place in a plain-text project description (markup, code, template syntax).
const MESSAGE_DISALLOWED = /[<>{}`\\;$]/;
// Contact is exempt: it doubles as an email/phone/Telegram-handle field, so it
// needs @, ., +, and digits, and isn't reasonably restricted to a strict pattern.

// Best-effort per-IP throttle. Resets on cold start and isn't shared across
// serverless instances, but it stops a single abusive client from flooding
// the Telegram chat, which is the realistic threat here.
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT.max;
}

// Strips control characters and any HTML-tag-like sequences. Nothing here is ever
// rendered as HTML or run as a query, but stripping it at the boundary means a
// malformed or hostile payload never reaches Telegram in the first place.
function sanitize(value: string): string {
  const printable = Array.from(value).filter((ch) => {
    const code = ch.codePointAt(0) ?? 0;
    return code >= 0x20 && code !== 0x7f;
  });
  return printable.join("").replace(/<[^>]*>/g, "").trim();
}

function isValidField(value: unknown, maxLen: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLen;
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: "forbidden_origin" }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { name, contact, message, website } = body as Record<string, unknown>;

  // Honeypot: a hidden field real visitors never fill in. Bots that auto-fill every
  // input trip it, so we accept quietly without forwarding anything to Telegram.
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    !isValidField(name, MAX_LEN.name) ||
    !isValidField(contact, MAX_LEN.contact) ||
    !isValidField(message, MAX_LEN.message)
  ) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }
  if (!NAME_PATTERN.test(name.trim()) || MESSAGE_DISALLOWED.test(message)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const cleanName = sanitize(name);
  const cleanContact = sanitize(contact);
  const cleanMessage = sanitize(message);
  if (!cleanName || !cleanContact || !cleanMessage) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const text = [
    "Новая заявка с сайта",
    `Имя: ${cleanName}`,
    `Контакт: ${cleanContact}`,
    `Сообщение: ${cleanMessage}`,
  ].join("\n");

  const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!telegramRes.ok) {
    return NextResponse.json({ error: "telegram_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
