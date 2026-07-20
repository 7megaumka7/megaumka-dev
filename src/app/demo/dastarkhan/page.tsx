"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Playfair_Display } from "next/font/google";

/*
 * Style fusion:
 * - Limón (moody brasserie): black-olive canvas #1d0b0d, one electric lemon accent
 *   #f7ea48 used only as filled CTA / display text on dark, warm-cream breathing
 *   sections, wide positive letter-spacing on display lines, 0–1px corner radius,
 *   zero shadows/gradients - flat and confident.
 * - Franco Maria Ricci (editorial catalogue): high-contrast serif italics as section
 *   titles over a 1px burnished-gold rule, bracketed text CTAs like { СМОТРЕТЬ МЕНЮ },
 *   three columns separated by hairline vertical rules - vitrines, not cards.
 */
const serif = Playfair_Display({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-dast-serif",
});

const OLIVE = "#1d0b0d";
const CREAM = "#fcf9f0";
const LEMON = "#f7ea48";
const GOLD = "#bc9c5c";
const INK = "#221a10"; // letterpress on cream

const MENU: { section: string; note: string; dishes: { name: string; desc: string; price: string }[] }[] = [
  {
    section: "Из казана",
    note: "огонь и чугун",
    dishes: [
      { name: "Бешбармак", desc: "отварная говядина, раскатанное тесто, луковый соус чык", price: "4 200" },
      { name: "Плов по-домашнему", desc: "баранина, желтая морковь, зира, казы", price: "3 800" },
      { name: "Куырдак", desc: "обжарка из субпродуктов, молодой картофель", price: "3 400" },
    ],
  },
  {
    section: "Тандыр и пар",
    note: "тесто и дым",
    dishes: [
      { name: "Манты с тыквой", desc: "пять штук, сметана с зеленью", price: "3 200" },
      { name: "Самса с бараниной", desc: "слоеное тесто из тандыра", price: "1 400" },
      { name: "Лагман", desc: "тянутая лапша, овощи вок, говядина", price: "3 500" },
    ],
  },
  {
    section: "К чаю",
    note: "печем каждое утро",
    dishes: [
      { name: "Баурсаки", desc: "во фритюре, к чаю с молоком", price: "1 800" },
      { name: "Чак-чак", desc: "мед, обжаренное тесто", price: "1 600" },
      { name: "Курт и сухофрукты", desc: "тарелка к чаю на компанию", price: "2 200" },
    ],
  },
];

const slots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"] as const;

// Shanyrak as a burnished-gold plate drawing - the single art object on the dark hero,
// in the FMR spirit of an illustration plate rather than decoration.
function ShanyrakArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
      <circle cx="100" cy="100" r="56" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        // fixed precision so the SSR and client attribute strings are identical -
        // raw Math.cos output (e.g. 86.99999999999999) causes a hydration mismatch
        const pt = (v: number) => v.toFixed(2);
        return (
          <line
            key={i}
            x1={pt(100 + Math.cos(a) * 26)}
            y1={pt(100 + Math.sin(a) * 26)}
            x2={pt(100 + Math.cos(a) * 78)}
            y2={pt(100 + Math.sin(a) * 78)}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
        );
      })}
      <circle cx="100" cy="100" r="14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// FMR section device: centered italic serif title over a full-width 1px gold rule.
function SectionTitle({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <h2
        className="text-2xl italic sm:text-3xl"
        style={{ fontFamily: "var(--font-dast-serif)", color: dark ? CREAM : INK }}
      >
        {children}
      </h2>
      <div className="mx-auto mt-4 h-px w-full" style={{ background: GOLD }} aria-hidden="true" />
    </div>
  );
}

// FMR bracketed CTA: text action wrapped in literal braces, hairline underline on hover.
function BracketLink({ href, children, dark = false }: { href: string; children: string; dark?: boolean }) {
  return (
    <a
      href={href}
      className="inline-block text-sm uppercase tracking-[0.2em] transition-colors"
      style={{ color: dark ? CREAM : INK }}
      onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
      onMouseLeave={(e) => (e.currentTarget.style.color = dark ? CREAM : INK)}
    >
      {"{ "}
      {children}
      {" }"}
    </a>
  );
}

export default function DastarkhanPage() {
  const [tableSize, setTableSize] = useState(2);
  const [slot, setSlot] = useState<(typeof slots)[number] | null>(null);

  return (
    <div className={`${serif.variable} min-h-screen`} style={{ background: OLIVE, color: CREAM }}>
      {/* nav - Limón: full-bleed dark bar, split link groups flanking a centered serif
          wordmark, wide-tracked uppercase, ghost 1px outline on the active item */}
      <header className="border-b" style={{ borderColor: `${GOLD}33` }}>
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5">
          <nav className="flex items-center gap-5 text-xs uppercase tracking-[0.2em]">
            <a href="#menu" className="border px-2.5 py-1 transition-colors hover:text-[#f7ea48]" style={{ borderColor: "#ffffff", borderRadius: 1 }}>
              Меню
            </a>
            <a href="#booking" className="transition-colors hover:text-[#f7ea48]">
              Бронь
            </a>
          </nav>
          <span
            className="text-center text-3xl tracking-[0.08em]"
            style={{ fontFamily: "var(--font-dast-serif)" }}
          >
            Дастархан
          </span>
          <Link
            href="/#projects"
            className="justify-self-end text-xs uppercase tracking-[0.15em] text-[#fcf9f0]/70 transition-colors hover:text-[#fcf9f0]"
          >
            ← megaumka.dev
          </Link>
        </div>
      </header>

      {/* hero - display line in lemon with signage tracking, gold shanyrak plate right,
          filled lemon CTA (the system's single loud element) + bracketed ghost link */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: GOLD }}>
            Казахская кухня · вечер · Астана
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 uppercase leading-[1.02]"
            style={{ color: LEMON, letterSpacing: "0.06em" }}
          >
            <span className="block text-[clamp(2.9rem,7.5vw,4.7rem)] font-normal">Дастархан</span>
            <span className="block text-[clamp(1.6rem,3.6vw,2.4rem)]" style={{ color: CREAM }}>
              ужин у огня
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-md text-[20px] leading-[1.25] text-[#fcf9f0]/85"
          >
            Готовим на огне, в казане и тандыре. Стол бронируется прямо на сайте:
            выбрали время, пришли, сели. Звонить никуда не надо.
          </motion.p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <a
              href="#booking"
              className="px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-opacity hover:opacity-90"
              style={{ background: LEMON, color: OLIVE, borderRadius: 1 }}
            >
              Забронировать стол
            </a>
            <BracketLink href="#menu" dark>
              Смотреть меню
            </BracketLink>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex min-h-[380px] items-center justify-center border"
          style={{ borderColor: `${GOLD}55`, borderRadius: 0 }}
        >
          <div style={{ color: GOLD }}>
            <ShanyrakArt className="h-64 w-64" />
          </div>
          <span
            className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            Шаңырақ: очаг дома
          </span>
          <span className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.3em] text-[#fcf9f0]/70">
            фиг. 1
          </span>
        </motion.div>
      </section>

      {/* menu - the cream breathing section (Limón) laid out as FMR vitrines:
          three columns divided by 1px vertical rules, serif dishes, gold section rule */}
      <section id="menu" className="py-20" style={{ background: CREAM, color: INK }}>
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle>Неономадская кухня</SectionTitle>

          <div className="mt-12 grid sm:grid-cols-3 sm:divide-x sm:divide-[#221a10]/30">
            {MENU.map((group) => (
              <div key={group.section} className="px-0 py-6 sm:px-8 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl italic" style={{ fontFamily: "var(--font-dast-serif)" }}>
                    {group.section}
                  </h3>
                  {/* FMR rule: gold is a stroke color on light surfaces - small text
                      switches to a darker bronze that clears 4.5:1 on cream */}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#77602f]">
                    {group.note}
                  </span>
                </div>
                <div className="mt-1 h-px w-full" style={{ background: `${GOLD}88` }} aria-hidden="true" />
                <ul className="mt-6 space-y-7">
                  {group.dishes.map((d) => (
                    <li key={d.name} className="group">
                      <div className="flex items-baseline justify-between gap-3">
                        <span
                          className="text-[20px] leading-[1.2] transition-colors group-hover:text-[#7a5c22]"
                          style={{ fontFamily: "var(--font-dast-serif)" }}
                        >
                          {d.name}
                        </span>
                        <span className="shrink-0 text-sm tabular-nums">{d.price} ₸</span>
                      </div>
                      <p className="mt-1.5 text-sm italic leading-[1.35] text-[#5c5344]">{d.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* chef's set - the dark gallery band (FMR magazine block): ink surface,
          lemon display price, bracketed CTA */}
      <section className="border-y py-20" style={{ background: "#150809", borderColor: `${GOLD}33` }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-10 px-6">
          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-[0.35em]" style={{ color: GOLD }}>
              Сет вечера
            </p>
            <h2
              className="mt-4 text-4xl italic sm:text-5xl"
              style={{ fontFamily: "var(--font-dast-serif)", color: CREAM }}
            >
              Сет «Дастархан»
            </h2>
            <p className="mt-5 text-[16px] leading-[1.37] text-[#fcf9f0]/85">
              Рассчитан на компанию из четырех-шести человек. Бешбармак, манты, самса,
              баурсаки, чай с молоком. Выносим все сразу: полупустой стол у нас не считается накрытым.
            </p>
            <div className="mt-8">
              <BracketLink href="#booking" dark>
                Забронировать под сет
              </BracketLink>
            </div>
          </div>
          <div
            className="text-[clamp(3rem,8vw,4.5rem)] uppercase leading-none"
            style={{ color: LEMON, letterSpacing: "0.06em" }}
          >
            18 000 ₸
          </div>
        </div>
      </section>

      {/* booking - dark canvas, square 1px-radius controls, lemon filled submit;
          the same real interactive state (party size + slot, disabled until complete) */}
      <section id="booking" className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionTitle dark>Забронировать стол</SectionTitle>

          <div className="mt-12 space-y-9">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#fcf9f0]/70">Количество гостей</p>
              <div className="mt-3 flex gap-2">
                {[2, 4, 6, 8].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setTableSize(n)}
                    className="h-11 w-11 border text-sm transition-colors"
                    style={
                      tableSize === n
                        ? { background: LEMON, color: OLIVE, borderColor: LEMON, borderRadius: 1 }
                        : { borderColor: "#fcf9f0", color: CREAM, borderRadius: 1 }
                    }
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#fcf9f0]/70">Время</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    className="border px-4 py-2 text-sm tabular-nums transition-colors"
                    style={
                      slot === s
                        ? { background: LEMON, color: OLIVE, borderColor: LEMON, borderRadius: 1 }
                        : { borderColor: "#fcf9f0", color: CREAM, borderRadius: 1 }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              disabled={!slot}
              className="w-full px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
              style={{ background: LEMON, color: OLIVE, borderRadius: 1 }}
            >
              {slot ? `Забронировать стол на ${tableSize}, ${slot}` : "Выберите время"}
            </button>
          </div>
        </div>
      </section>

      {/* footer - structured catalogue colophon over a gold hairline */}
      <footer className="border-t py-12" style={{ borderColor: `${GOLD}33` }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-6 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              Адрес
            </p>
            <p className="mt-2 text-[#fcf9f0]/85">Астана, набережная Есиля (демо-адрес)</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              Часы
            </p>
            <p className="mt-2 text-[#fcf9f0]/85">Ежедневно 12:00 - 23:00</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              О демо
            </p>
            <p className="mt-2 text-[#fcf9f0]/85">
              Сделано в студии{" "}
              <Link href="/" className="underline transition-colors hover:text-[#f7ea48]">
                megaumka.dev
              </Link>
              . Витрина работает на фронтенде, бронь не отправляется.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
