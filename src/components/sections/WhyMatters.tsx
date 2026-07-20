"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

/*
 * Full-bleed banner after the Hyperstudio reference (styles.refero.design,
 * "blueprint scratched into obsidian"): pure-black canvas, 1px #212121 hairlines
 * as the only structure, weight-400 display type, white pill CTA, wireframe
 * line art instead of photography, zero shadows.
 * Palette twist per the brief: the two reaching hands take the site's own
 * colours - sage green and dusty rose.
 */
const OBSIDIAN = "#101010";
const CARBON = "#171717";
const HAIRLINE = "#212121";
const CHALK = "#f3f3f3";
const SMOKE = "#9c9c9c";
const GREEN = "#8fbb7c"; // site primary (dark-theme shade - readable on black)
const ROSE = "#d19aa3"; // site violet/blush (dark-theme shade)

const REASONS: { icon: "eye" | "shield" | "bolt"; title: string; body: string }[] = [
  {
    icon: "eye",
    title: "Клиент гуглит вас до звонка",
    body: "Сайт отвечает раньше менеджера. Кривая верстка читается как «и в договоре будет так же», а аккуратная страница продает еще до первого разговора.",
  },
  {
    icon: "shield",
    title: "Сканеры не выбирают «крупных»",
    body: "Автоматические боты долбят все сайты подряд. Дыра в форме сливает базу клиентов, а вместе с ней и репутацию. Чинить выходит дороже, чем сразу строить правильно.",
  },
  {
    icon: "bolt",
    title: "Медленно = мимо кассы",
    body: "Покупатель уходит раньше, чем увидел цену, если страница грузится вечность. Скорость определяет дизайн, а не тариф хостинга.",
  },
];

function ReasonIcon({ kind }: { kind: "eye" | "shield" | "bolt" }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      {kind === "eye" && (
        <g {...stroke}>
          <path d="M3 16c3.5-6 8-9 13-9s9.5 3 13 9c-3.5 6-8 9-13 9S6.5 22 3 16z" />
          <circle cx="16" cy="16" r="4.5" />
        </g>
      )}
      {kind === "shield" && (
        <g {...stroke}>
          <path d="M16 3l10 4v8c0 6.5-4 11.5-10 14-6-2.5-10-7.5-10-14V7z" />
          <path d="M11.5 16l3 3 6-6" />
        </g>
      )}
      {kind === "bolt" && (
        <g {...stroke}>
          <path d="M18 3L7 18h7l-2 11 11-15h-7z" />
        </g>
      )}
    </svg>
  );
}

// The hyperstudio.org hero hands, traced 1:1 from their actual
// /static/images/hero-hands.avif (same halftone dot pattern, pixel-for-pixel),
// recoloured green→rose to match the site's own palette instead of their
// monochrome white. Fully transparent background - no fill colour at all -
// so it sits on the section's obsidian background with zero visible seam in
// either theme. A slow glow pulse (brighter on hover) is layered on top via
// drop-shadow, pure CSS, disabled under prefers-reduced-motion.
function DotHands() {
  return (
    <div className="hyperstudio-hands w-full" aria-hidden="true">
      <Image
        src="/hands-hyperstudio.png"
        alt=""
        width={2200}
        height={639}
        sizes="100vw"
        className="h-auto w-full"
        priority={false}
        draggable={false}
      />
      <style>{`
        .hyperstudio-hands img {
          animation: hands-glow 3.2s ease-in-out infinite;
          transition: filter 0.2s ease;
        }
        .hyperstudio-hands:hover img {
          filter: drop-shadow(0 0 10px ${GREEN}) drop-shadow(0 0 10px ${ROSE});
        }
        @keyframes hands-glow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(0,0,0,0)); }
          50% { filter: drop-shadow(0 0 6px ${GREEN}) drop-shadow(0 0 6px ${ROSE}); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hyperstudio-hands img { animation: none; }
        }
      `}</style>
    </div>
  );
}

export function WhyMatters() {
  const t = useT();

  function goToContact() {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      aria-label={t.why.title}
      className="border-y"
      style={{ background: OBSIDIAN, borderColor: HAIRLINE }}
    >
      <div className="mx-auto max-w-[1200px] px-6 pt-20 sm:pt-28">
        <Reveal>
          <h2
            className="max-w-3xl text-3xl font-normal leading-[1.07] tracking-[-0.01em] sm:text-5xl"
            style={{ color: CHALK }}
          >
            {t.why.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: SMOKE }}>
            {t.why.intro}
          </p>
        </Reveal>
      </div>

      {/* full-bleed - breaks out of the max-w container so the hands span the whole viewport */}
      <Reveal delay={0.15} className="mt-14 w-full">
        <DotHands />
      </Reveal>

      <div className="mx-auto max-w-[1200px] px-6 pb-20 sm:pb-28">
        {/* three reasons - hairline-divided columns, icons in the two hand colours */}
        <Reveal
          delay={0.2}
          className="mt-14 grid border-t border-[#212121] sm:grid-cols-3 sm:divide-x sm:divide-[#212121]"
        >
          {REASONS.map((r, i) => (
            <div key={r.title} className="px-0 py-8 transition-colors sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <span style={{ color: i === 1 ? ROSE : GREEN }}>
                <ReasonIcon kind={r.icon} />
              </span>
              <h3 className="mt-4 text-xl font-normal" style={{ color: CHALK }}>
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: SMOKE }}>
                {r.body}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.25} className="mt-12">
          <button
            type="button"
            onClick={goToContact}
            className="rounded-full px-6 py-3 text-sm font-normal uppercase tracking-wide transition-colors hover:bg-[#d19aa3]"
            style={{ background: "#ffffff", color: OBSIDIAN }}
          >
            {t.why.cta}
          </button>
        </Reveal>
      </div>
      {/* subtle carbon band edge, per the reference's carbon-on-obsidian layering */}
      <div className="h-2 w-full" style={{ background: CARBON }} aria-hidden="true" />
    </section>
  );
}
