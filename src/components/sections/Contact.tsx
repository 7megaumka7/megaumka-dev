"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

const CONTACT_EMAIL = "info@megaumka.dev";
const TELEGRAM_USERNAME = "megaumka_dev_bot";
// TODO(owner): replace with the studio's real WhatsApp number (digits only, no +).
// The button renders only when a number is set - no risk of messaging a stranger.
const WHATSAPP_NUMBER = "";

type Status = "idle" | "sending" | "success" | "error";

// Mirrors the server-side rules in /api/contact: name stays letters/spaces/hyphens,
// message blocks markup- and code-like characters. Contact is left unrestricted
// since it doubles as an email/phone/Telegram field and needs @, ., + and digits.
const NAME_DISALLOWED = /[^\p{L}\s'-]/gu;
const MESSAGE_DISALLOWED = /[<>{}`\\;$]/g;

function filterName(value: string) {
  return value.replace(NAME_DISALLOWED, "");
}

function filterMessage(value: string) {
  return value.replace(MESSAGE_DISALLOWED, "");
}

export function Contact() {
  const t = useT();
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message, website }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setName("");
      setContact("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-2xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-primary">{t.contact.title}</h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-4 max-w-lg text-muted">
        {t.contact.lead}
      </Reveal>
      <Reveal delay={0.15} className="mt-3 flex items-center gap-2 font-mono text-xs text-muted">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        Отвечаем в течение <span className="font-bold text-primary">1</span> рабочего дня
      </Reveal>

      <Reveal delay={0.2} className="mt-8">
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-3">
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(filterName(e.target.value))}
            placeholder={t.contact.formName}
            disabled={status === "sending"}
            className="rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary-dim disabled:opacity-60"
          />
          <input
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={t.contact.formContact}
            disabled={status === "sending"}
            className="rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary-dim disabled:opacity-60"
          />
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(filterMessage(e.target.value))}
            placeholder={t.contact.formMessage}
            disabled={status === "sending"}
            className="resize-none rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary-dim disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-violet hover:text-background disabled:opacity-60"
          >
            {status === "sending" ? t.contact.formSending : t.contact.formSubmit}
          </button>
          {status === "success" && (
            <p className="text-sm text-primary" role="status">
              {t.contact.formSuccess}
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500" role="status">
              {t.contact.formError}
            </p>
          )}
        </form>
      </Reveal>

      <Reveal delay={0.25} className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-xs text-muted">{t.contact.formOr}</span>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary-dim hover:bg-primary-tint"
        >
          {CONTACT_EMAIL}
        </a>
        <a
          href={`https://t.me/${TELEGRAM_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary-dim hover:bg-primary-tint"
        >
          <TelegramIcon className="h-4 w-4 text-primary" />
          Telegram
        </a>
        {WHATSAPP_NUMBER && (
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary-dim hover:bg-primary-tint"
          >
            <WhatsAppIcon className="h-4 w-4 text-primary" />
            WhatsApp
          </a>
        )}
      </Reveal>
    </section>
  );
}

function TelegramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 4.5 2.7 12.1c-1.3.5-1.3 1.2-.2 1.5l4.9 1.5 1.9 5.8c.2.7.4.9.9.9.4 0 .6-.2.9-.5l2.1-2 4.4 3.2c.8.5 1.4.2 1.6-.7l2.9-13.7c.3-1.2-.4-1.7-1.2-1.4ZM8.3 13.9l9.6-6.1c.5-.3.9-.1.5.2l-8.2 7.5-.3 3.2-1.6-4.8Z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.5-.6c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 2.6 1.1 2.6.7 3 .7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}
