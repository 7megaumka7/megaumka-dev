"use client";

import { BearWithLaptop } from "@/components/motion/BearWithLaptop";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

export function Hero() {
  const t = useT();

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="hero"
      className="relative mx-auto grid min-h-[100svh] max-w-6xl scroll-mt-24 content-center items-center gap-10 px-6 pb-24 pt-28 sm:grid-cols-[1.1fr_0.9fr] sm:gap-8"
    >
      <div className="flex flex-col items-center gap-5 text-center sm:items-start sm:text-left">
        <Reveal className="inline-flex items-center gap-2 rounded-md border border-border px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          {t.hero.badge}
        </Reveal>

        <AnimatedHeadline
          text={t.hero.headline}
          highlightWord={t.hero.highlightWord}
          className="max-w-xl text-4xl font-bold tracking-tight text-primary sm:text-6xl"
        />

        <Reveal delay={0.55}>
          <p className="max-w-md text-base text-muted sm:text-lg">{t.hero.lead}</p>
        </Reveal>

        <Reveal delay={0.7} className="flex flex-wrap justify-center gap-3 sm:justify-start">
          <Magnetic>
            <button
              type="button"
              onClick={() => goTo("projects")}
              className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-violet hover:text-background"
            >
              {t.hero.ctaProjects}
            </button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={() => goTo("contact")}
              className="inline-block rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-violet hover:bg-violet-tint"
            >
              {t.hero.ctaContact}
            </button>
          </Magnetic>
        </Reveal>

        {/* two labeled tag groups: technologies vs security credentials - mixing them
            into one row made OSCP look like a JS framework */}
        <Reveal delay={0.85} className="flex flex-col items-center gap-2.5 sm:items-start">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">стек</span>
            {["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"].map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">безопасность</span>
            {["OSCP", "4+ лет в информационной безопасности", "security-ревью в каждом проекте"].map((s) => (
              <span
                key={s}
                className="rounded-md border border-primary-dim/40 bg-primary-tint px-2.5 py-1 font-mono text-xs text-primary-dim"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.3} className="mx-auto w-64 sm:w-full sm:max-w-sm">
        <BearWithLaptop className="mx-auto block h-64 w-64 sm:h-96 sm:w-96" />
      </Reveal>

      {/* numbers strip - the KZ-agency trust pattern (projects/team/certification),
          pinned to the bottom edge of the full-screen banner */}
      <div className="absolute inset-x-6 bottom-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 border-t border-border pt-5 font-mono text-xs text-muted sm:justify-between">
        <span>6 живых работ</span>
        <span>4 человека в команде</span>
        <span>Астана · Алматы · Лос-Анджелес</span>
        <span className="hidden sm:inline">OSCP · security-ревью включено</span>
      </div>
    </section>
  );
}
