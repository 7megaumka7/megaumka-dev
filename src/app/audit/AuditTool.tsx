"use client";

import { useState } from "react";
import { track } from "@/lib/track";

type Check = { id: string; label: string; pass: boolean; detail: string };
type Result = { url: string; status: number; responseTimeMs: number; score: number; total: number; checks: Check[] };

const ERROR_MESSAGES: Record<string, string> = {
  invalid_url: "Это не похоже на адрес сайта. Проверьте написание.",
  invalid_protocol: "Поддерживаются только http и https адреса.",
  blocked_host: "Этот адрес нельзя проверить - похоже на внутренний или локальный.",
  dns_failed: "Не удалось найти такой сайт (DNS не отвечает).",
  too_many_redirects: "Сайт зациклился в редиректах.",
  rate_limited: "Слишком много проверок подряд. Подождите пару минут.",
  fetch_failed: "Сайт не ответил. Возможно, он недоступен снаружи.",
};

export function AuditTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(ERROR_MESSAGES[data.error as string] ?? "Не получилось проверить сайт. Попробуйте другой адрес.");
        return;
      }
      setResult(data);
      track("audit_completed");
    } catch {
      setError("Не получилось проверить сайт. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="ваш-сайт.kz"
          disabled={loading}
          className="flex-1 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary-dim disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-background transition duration-200 hover:bg-violet hover:text-background active:scale-[0.97] disabled:opacity-60"
        >
          {loading ? "Проверяем..." : "Проверить"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-sm text-danger" role="status">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8" role="status">
          <div className="flex items-baseline gap-3">
            <p className="text-2xl font-bold text-foreground">
              {result.score}/{result.total}
            </p>
            <p className="text-sm text-muted">
              проверок пройдено · ответ за {result.responseTimeMs} мс
            </p>
          </div>

          <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
            {result.checks.map((c) => (
              <li
                key={c.id}
                className={`flex items-start gap-3 px-4 py-3 text-sm ${c.pass ? "bg-primary-tint" : "bg-danger-tint"}`}
              >
                {c.pass ? (
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <CrossIcon className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                )}
                <span>
                  <span className="block font-medium text-foreground">{c.label}</span>
                  <span className="text-muted">{c.detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-dashed border-border bg-surface-2/50 p-5">
            <p className="font-semibold text-foreground">Что дальше?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Если тут больше одного красного пункта - это нормально, почти у всех так. Мы чиним ровно это:
              security-заголовки, HTTPS, мобильную верстку и базовое SEO входят в обычную сдачу проекта.
            </p>
            <a
              href="/#contact"
              onClick={() => track("email_click")}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-background transition duration-200 hover:bg-violet hover:text-background active:scale-[0.97]"
            >
              Обсудить, что с этим делать
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}

function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}
