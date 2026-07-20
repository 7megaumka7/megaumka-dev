"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Oswald } from "next/font/google";

// Boutique-fitness reference: Barry's / 1REBEL - black + signal red, giant condensed
// caps (filled + outlined pairing), and the schedule as a real studio timetable:
// full-width rows with a time rail, not a grid of soft cards.
const display = Oswald({ weight: ["500", "700"], subsets: ["cyrillic", "latin"], variable: "--font-fp-display" });

const RED = "#ff4d5a";

type GymClass = { name: string; coach: string; time: string; spots: number; capacity: number };

// Two real days of schedule - the tab switch swaps data, not just a highlight.
const SCHEDULE: Record<"today" | "tomorrow", GymClass[]> = {
  today: [
    { name: "Пилатес", coach: "Jess R.", time: "07:30", spots: 6, capacity: 10 },
    { name: "Функциональный тренинг", coach: "Marcus D.", time: "09:00", spots: 3, capacity: 12 },
    { name: "Йога", coach: "Sofia L.", time: "11:00", spots: 0, capacity: 10 },
    { name: "Бокс", coach: "Andre B.", time: "18:00", spots: 5, capacity: 14 },
    { name: "Стретчинг", coach: "Jess R.", time: "19:30", spots: 8, capacity: 16 },
    { name: "HIIT", coach: "Marcus D.", time: "20:00", spots: 1, capacity: 12 },
  ],
  tomorrow: [
    { name: "Кроссфит", coach: "Andre B.", time: "08:00", spots: 9, capacity: 12 },
    { name: "Йога", coach: "Sofia L.", time: "10:00", spots: 4, capacity: 10 },
    { name: "Барре", coach: "Jess R.", time: "12:30", spots: 7, capacity: 14 },
    { name: "Бокс", coach: "Andre B.", time: "18:30", spots: 0, capacity: 14 },
    { name: "HIIT", coach: "Marcus D.", time: "19:30", spots: 2, capacity: 12 },
    { name: "Стретчинг", coach: "Sofia L.", time: "21:00", spots: 12, capacity: 16 },
  ],
};

export default function FitPulsePage() {
  const [day, setDay] = useState<"today" | "tomorrow">("today");
  // booked keys are day-scoped so a booking on "today" never leaks into "tomorrow"
  const [booked, setBooked] = useState<Set<string>>(new Set());
  const classes = SCHEDULE[day];

  function toggle(name: string) {
    setBooked((cur) => {
      const next = new Set(cur);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <div className={`${display.variable} min-h-screen bg-[#0b0b0d] text-white`}>
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span
            className="text-xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "var(--font-fp-display)" }}
          >
            Fit<span style={{ color: RED }}>Pulse</span>
          </span>
          <Link href="/#projects" className="text-xs text-white/70 transition-colors hover:text-white">
            ← портфолио megaumka.dev
          </Link>
        </div>
      </header>

      {/* hero - stacked display type: filled line + outlined line (the Barry's pairing),
          red slab underneath carrying the actual promise */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="uppercase leading-[0.92]"
          style={{ fontFamily: "var(--font-fp-display)" }}
        >
          <span className="block text-[clamp(3.5rem,11vw,8rem)] font-bold">Тренируйся</span>
          <span
            className="block text-[clamp(3.5rem,11vw,8rem)] font-bold text-transparent"
            style={{ WebkitTextStroke: `2px ${RED}` }}
          >
            громче.
          </span>
        </motion.h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-white/65">
          Boutique-студия · Лос-Анджелес, Echo Park
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="h-1.5 w-24" style={{ background: RED }} />
          <p className="max-w-xl text-white/75">
            В расписании видно, сколько мест осталось на самом деле. Группа набралась -
            кнопка гаснет. Приходить «на удачу» больше не нужно.
          </p>
        </div>
      </section>

      {/* timetable - studio-schedule rows: time rail, class, coach, live spots, action.
          Full class rows go dim and lock automatically. */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="flex items-baseline justify-between border-b-2 border-white pb-3">
          <div className="flex items-baseline gap-6">
            {(["today", "tomorrow"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDay(d)}
                aria-pressed={day === d}
                className={`text-2xl font-bold uppercase tracking-wide transition-colors ${
                  day === d ? "text-white" : "text-white/55 hover:text-white/80"
                }`}
                style={{ fontFamily: "var(--font-fp-display)" }}
              >
                {d === "today" ? "Сегодня" : "Завтра"}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-white/65">
            {classes.length} занятий
          </span>
        </div>

        <ul>
          {classes.map((c, i) => {
            const isBooked = booked.has(`${day}:${c.name}`);
            const full = c.spots === 0 && !isBooked;
            return (
              <motion.li
                key={`${day}:${c.name}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-white/10 py-5 sm:grid-cols-[96px_1.4fr_1fr_auto_auto] sm:gap-6"
              >
                {/* full rows dim via WCAG-passing muted colors, not a wrapper opacity -
                    an opacity-dimmed row fails axe color-contrast on every text node */}
                <span
                  className={`text-2xl font-bold tabular-nums sm:text-3xl ${full ? "text-white/55" : ""}`}
                  style={{ fontFamily: "var(--font-fp-display)", color: full ? undefined : RED }}
                >
                  {c.time}
                </span>
                <div>
                  <h3
                    className={`text-lg font-semibold uppercase tracking-wide sm:text-xl ${
                      full ? "text-white/55" : ""
                    }`}
                    style={{ fontFamily: "var(--font-fp-display)" }}
                  >
                    {c.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-white/70 sm:hidden">{c.coach}</p>
                </div>
                <span className="hidden text-sm text-white/70 sm:block">{c.coach}</span>
                <span
                  className={`hidden font-mono text-xs uppercase tracking-wider sm:block ${
                    full ? "text-white/55" : c.spots <= 2 ? "text-[#ffb020]" : "text-white/70"
                  }`}
                >
                  {full ? "мест нет" : `${c.spots}/${c.capacity} мест`}
                </span>
                <button
                  type="button"
                  disabled={full}
                  onClick={() => toggle(`${day}:${c.name}`)}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                    full
                      ? "cursor-not-allowed border border-white/15 text-white/55"
                      : isBooked
                        ? "border border-white text-white hover:bg-white hover:text-[#0b0b0d]"
                        : "text-[#0b0b0d] hover:brightness-110"
                  }`}
                  style={full || isBooked ? undefined : { background: RED }}
                >
                  {full ? "Мест нет" : isBooked ? "Отменить запись" : "Записаться"}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {/* sticky booking summary - appears only when something is actually booked */}
      <AnimatePresence>
        {booked.size > 0 && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 text-[#0b0b0d]"
            style={{ background: RED }}
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
              <span
                className="text-sm font-bold uppercase tracking-widest"
                style={{ fontFamily: "var(--font-fp-display)" }}
              >
                Записан на {booked.size} {booked.size === 1 ? "занятие" : booked.size < 5 ? "занятия" : "занятий"}
              </span>
              <button
                type="button"
                onClick={() => setBooked(new Set())}
                className="border border-[#0b0b0d]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-[#0b0b0d] hover:text-white"
              >
                Сбросить
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs text-white/65">
          <span
            className="text-lg font-bold uppercase tracking-wide text-white"
            style={{ fontFamily: "var(--font-fp-display)" }}
          >
            Fit<span style={{ color: RED }}>Pulse</span>
          </span>
          <span>
            Сделано в студии{" "}
            <Link href="/" className="underline hover:text-white">
              megaumka.dev
            </Link>
            . Витрина работает на фронтенде, запись живет в состоянии страницы.
          </span>
        </div>
      </footer>
    </div>
  );
}
