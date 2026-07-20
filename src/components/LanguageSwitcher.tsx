"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import { FlagRU } from "./flags/RU";
import { FlagKZ } from "./flags/KZ";
import { FlagGB } from "./flags/GB";

const OPTIONS: { locale: Locale; label: string; Flag: (props: { className?: string }) => React.JSX.Element }[] = [
  { locale: "ru", label: "RU", Flag: FlagRU },
  { locale: "kz", label: "KZ", Flag: FlagKZ },
  { locale: "en", label: "EN", Flag: FlagGB },
];

export function LanguageSwitcher() {
  const { locale, setLocale, dict } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((o) => o.locale === locale) ?? OPTIONS[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={dict.language.label}
        className="flex h-8 items-center gap-1.5 rounded-full border border-border px-2 text-xs font-medium text-foreground transition-colors hover:border-primary-dim"
      >
        <current.Flag className="h-3.5 w-5 rounded-sm" />
        <span className="font-mono">{current.label}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[7.5rem] overflow-hidden rounded-lg border border-border bg-surface shadow-lg"
        >
          {OPTIONS.map((opt) => (
            <li key={opt.locale} role="option" aria-selected={opt.locale === locale}>
              <button
                type="button"
                onClick={() => {
                  setLocale(opt.locale);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-surface-2 ${
                  opt.locale === locale ? "text-primary" : "text-foreground"
                }`}
              >
                <opt.Flag className="h-3.5 w-5 rounded-sm" />
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
