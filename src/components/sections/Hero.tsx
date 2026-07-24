"use client";

import { useState } from "react";
import { BearWithLaptop } from "@/components/motion/BearWithLaptop";
import { TerminalHeadline } from "@/components/motion/TerminalHeadline";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

// Same dark palette as the WhyMatters section, reused here so the two dark
// moments on the page (hero terminal, "why it matters" hands) read as one
// consistent world instead of two different one-off treatments.
const OBSIDIAN = "#101010";
const CARBON = "#171717";
const HAIRLINE = "#212121";
const CHALK = "#f3f3f3";
const SMOKE = "#9c9c9c";
const ROSE = "#d19aa3";

// Headline finishes typing at HEADLINE_LENGTH * 32ms; the rest of the
// terminal content is timed to arrive only after that, so nothing competes
// with the typing for attention. The bear is the very last thing to appear,
// as the "output" of the open command - and then it never moves again.
const HEADLINE_TYPE_MS = 1900;
const LEAD_DELAY = HEADLINE_TYPE_MS / 1000 + 0.15;
const CTA_DELAY = LEAD_DELAY + 0.2;
const TAGS_DELAY = CTA_DELAY + 0.2;
const OPEN_CMD_START_MS = (TAGS_DELAY + 0.3) * 1000;
const BEAR_DELAY = OPEN_CMD_START_MS / 1000 + 0.7;

export function Hero() {
  const t = useT();
  const [closed, setClosed] = useState(false);
  const [minimized, setMinimized] = useState(false);

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (closed) {
    return (
      <section
        id="hero"
        className="flex scroll-mt-24 items-center justify-center py-24"
        style={{ background: OBSIDIAN, borderBottom: `1px solid ${HAIRLINE}` }}
      >
        <button
          type="button"
          onClick={() => setClosed(false)}
          className="rounded-md border px-4 py-2 font-terminal text-xs uppercase tracking-widest transition-colors hover:border-primary"
          style={{ borderColor: HAIRLINE, color: SMOKE }}
        >
          megaumka — zsh (closed) · click to reopen
        </button>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="scroll-mt-24"
      style={{ background: OBSIDIAN, borderBottom: `1px solid ${HAIRLINE}` }}
    >
      <div className="mx-auto flex min-h-[100svh] max-w-5xl items-center px-6 py-24">
        <div
          className="w-full overflow-hidden rounded-xl border shadow-2xl"
          style={{ background: CARBON, borderColor: HAIRLINE }}
        >
          {/* terminal window title bar - red closes, yellow minimizes, like a real window */}
          <div
            className="flex items-center gap-2 border-b px-4 py-3"
            style={{ borderColor: HAIRLINE, background: OBSIDIAN }}
          >
            <button
              type="button"
              onClick={() => setClosed(true)}
              aria-label="Закрыть"
              className="h-3 w-3 rounded-full transition-opacity hover:opacity-80 active:scale-90"
              style={{ background: "#ff5f57" }}
            />
            <button
              type="button"
              onClick={() => setMinimized((v) => !v)}
              aria-label={minimized ? "Развернуть" : "Свернуть"}
              className="h-3 w-3 rounded-full transition-opacity hover:opacity-80 active:scale-90"
              style={{ background: "#febc2e" }}
            />
            <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
            <button
              type="button"
              onClick={() => setMinimized((v) => !v)}
              className="ml-3 font-terminal text-xs"
              style={{ color: SMOKE }}
            >
              megaumka — zsh
            </button>
          </div>

          {!minimized && (
          <div className="px-6 py-10 sm:px-10 sm:py-14">
            <Reveal
              className="mb-6 inline-flex items-center gap-2 rounded-md border px-3.5 py-1.5 font-terminal text-xs uppercase tracking-widest"
              style={{ borderColor: HAIRLINE, color: SMOKE }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              {t.hero.badge}
            </Reveal>

            <TerminalHeadline
              text={t.hero.headline}
              highlightWord={t.hero.highlightWord}
              className="max-w-2xl text-4xl font-bold tracking-tight text-[#f3f3f3] sm:text-6xl"
              prompt="root@megaumka:~$"
              promptColor={SMOKE}
              highlightColor={ROSE}
            />

            <Reveal delay={LEAD_DELAY}>
              <p className="mt-6 max-w-md font-terminal text-sm leading-relaxed sm:text-base" style={{ color: SMOKE }}>
                {t.hero.lead}
              </p>
            </Reveal>

            <Reveal delay={CTA_DELAY} className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => goTo("projects")}
                  className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-background shadow-sm transition duration-200 hover:bg-violet hover:text-background active:scale-[0.97]"
                >
                  {t.hero.ctaProjects}
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  type="button"
                  onClick={() => goTo("contact")}
                  className="inline-block rounded-lg border px-6 py-3 text-sm font-medium transition duration-200 hover:border-violet active:scale-[0.97]"
                  style={{ borderColor: HAIRLINE, color: CHALK }}
                >
                  {t.hero.ctaContact}
                </button>
              </Magnetic>
            </Reveal>

            {/* two labeled tag groups: technologies vs security credentials */}
            <Reveal delay={TAGS_DELAY} className="mt-8 flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-terminal text-[10px] uppercase tracking-widest" style={{ color: SMOKE }}>
                  стек
                </span>
                {["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"].map((s) => (
                  <span
                    key={s}
                    className="rounded-md border px-2.5 py-1 font-terminal text-xs"
                    style={{ borderColor: HAIRLINE, color: SMOKE }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-terminal text-[10px] uppercase tracking-widest" style={{ color: SMOKE }}>
                  безопасность
                </span>
                {["OSCP", "4+ лет в информационной безопасности", "security-ревью в каждом проекте"].map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-primary-dim/40 bg-primary-tint px-2.5 py-1 font-terminal text-xs text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* the bear as the rendered "output" of an explicit open command -
                appears last, once, and then sits completely still */}
            <TerminalHeadline
              as="p"
              text="open ./bear.jpg"
              startDelayMs={OPEN_CMD_START_MS}
              className="mt-8 text-sm text-[#f3f3f3] sm:text-base"
              prompt="root@megaumka:~$"
              promptColor={SMOKE}
            />

            <Reveal delay={BEAR_DELAY} className="mt-2 w-48 sm:w-64">
              <BearWithLaptop className="block h-48 w-48 sm:h-64 sm:w-64" />
            </Reveal>

            {/* trust strip, styled as a shell comment */}
            <p
              className="mt-10 border-t pt-5 font-terminal text-xs"
              style={{ borderColor: HAIRLINE, color: SMOKE }}
            >
              # 6 живых работ · 4 человека в команде · Астана · Алматы · Лос-Анджелес · OSCP
            </p>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
