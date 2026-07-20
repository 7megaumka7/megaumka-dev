import { NextResponse } from "next/server";

const TELEGRAM_API = "https://api.telegram.org/bot";

type TelegramUser = { id: number };
type TelegramMessage = {
  message_id: number;
  chat: { id: number };
  from?: TelegramUser;
  forward_from?: TelegramUser;
  reply_to_message?: TelegramMessage;
};
type TelegramUpdate = { message?: TelegramMessage };

function api(token: string, method: string) {
  return `${TELEGRAM_API}${token}/${method}`;
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const adminChatId = process.env.TELEGRAM_CHAT_ID;
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!token || !adminChatId || !webhookSecret) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const secretHeader = request.headers.get("x-telegram-bot-api-secret-token");
  if (secretHeader !== webhookSecret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const update = (await request.json()) as TelegramUpdate;
  const message = update.message;
  if (!message?.from) {
    return NextResponse.json({ ok: true });
  }

  const isFromAdmin = String(message.from.id) === adminChatId;

  if (isFromAdmin) {
    // Admin replying: route back to whoever the replied-to message was forwarded from.
    const targetId = message.reply_to_message?.forward_from?.id;
    if (targetId) {
      await fetch(api(token, "copyMessage"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: targetId,
          from_chat_id: message.chat.id,
          message_id: message.message_id,
        }),
      });
    }
    return NextResponse.json({ ok: true });
  }

  // Message from a customer: forward it to the admin so they see it, tagged with the sender.
  await fetch(api(token, "forwardMessage"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: adminChatId,
      from_chat_id: message.chat.id,
      message_id: message.message_id,
    }),
  });

  return NextResponse.json({ ok: true });
}
