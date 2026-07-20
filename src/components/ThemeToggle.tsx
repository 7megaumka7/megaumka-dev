"use client";

import { useTheme } from "./ThemeProvider";
import { useT } from "@/lib/i18n/I18nProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useT();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.theme.toggleToLight : t.theme.toggleToDark}
      title={isDark ? t.theme.toggleToLight : t.theme.toggleToDark}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary-dim hover:text-primary"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}
