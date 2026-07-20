"use client";

import Link from "next/link";
import { BearLogo } from "./BearLogo";
import { useT } from "@/lib/i18n/I18nProvider";

export function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BearLogo className="h-5 w-5 text-muted" />
          <span>{t.footer.tagline}</span>
        </div>
        <span className="flex flex-wrap items-center gap-4">
          <Link href="/blog" className="underline transition-colors hover:text-foreground">
            Блог
          </Link>
          <span>© {new Date().getFullYear()}. {t.footer.note}</span>
        </span>
      </div>
    </footer>
  );
}
