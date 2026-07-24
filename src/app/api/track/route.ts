import { NextResponse } from "next/server";

// Zero-new-account analytics: pings the same Telegram bot the contact form
// already uses. Right now a WhatsApp/Telegram/email click is a dead end for
// the founder - the visitor leaves the site and nothing records it happened.
// This makes that moment visible without wiring up GA4/Metrika.
const ALLOWED_EVENTS = new Set(["whatsapp_click", "telegram_click", "email_click", "phone_click", "audit_completed"]);
const EVENT_LABEL: Record<string, string> = {
  whatsapp_click: "WhatsApp",
  telegram_click: "Telegram",
  email_click: "Email",
  phone_click: "Телефон",
  audit_completed: "Прошли аудит на /audit",
};
const ALLOWED_ORIGINS = new Set(["https://megaumka.dev"]);

// Same shape as /api/contact's throttle: resets on cold start, not shared
// across instances, but stops a single client from flooding the chat.
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 20 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT.max;
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
    return NextResponse.json({ ok: true });
  }

  // sendBeacon posts text/plain - accept the body as raw text either way.
  const rawBody = await request.text();
  let event: unknown;
  try {
    event = (JSON.parse(rawBody) as { event?: unknown }).event;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (typeof event !== "string" || !ALLOWED_EVENTS.has(event)) {
    return NextResponse.json({ error: "invalid_event" }, { status: 400 });
  }

  const path = request.headers.get("referer") ?? "";
  const text = `Клик по контакту: ${EVENT_LABEL[event]}${path ? `\n${path}` : ""}`;

  // Fire-and-forget from the route's perspective too: a Telegram outage
  // shouldn't turn into a client-visible error for a purely informational ping.
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  }).catch(() => {});

  return NextResponse.json({ ok: true });
}
