"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Unbounded } from "next/font/google";

// Cinematic-publisher reference: Annapurna Interactive / Bithell Games - near-black,
// one huge display face, the catalog as a numbered index (title row = the poster),
// and a ticker marquee instead of decorative blobs.
const display = Unbounded({ weight: ["500", "700"], subsets: ["cyrillic", "latin"], variable: "--font-pf-display" });

const games = [
  { idx: "01", title: "Ironbound", genre: "Пошаговая тактика", year: "2025", color: "#a855f7", status: "второй сезон в разработке" },
  { idx: "02", title: "Nightfall Drift", genre: "Аркадные гонки", year: "2024", color: "#f97316", status: "вышла" },
  { idx: "03", title: "Echo Chamber", genre: "Головоломка", year: "2023", color: "#22d3ee", status: "вышла" },
  { idx: "04", title: "Starling", genre: "Приключение", year: "2026", color: "#eab308", status: "анонс" },
] as const;

const TICKER = games.map((g) => g.title.toUpperCase()).join(" - ") + " - ";

export default function PixelforgePage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={`${display.variable} min-h-screen bg-[#0c0a10] text-[#f2eefb]`}>
      <style>{`
        @keyframes pf-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-sm font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-pf-display)" }}>
            Pixelforge
          </span>
          <Link href="/#projects" className="text-xs text-white/50 transition-colors hover:text-white">
            ← портфолио megaumka.dev
          </Link>
        </div>
      </header>

      {/* ticker - the catalog itself is the ornament */}
      <div className="overflow-hidden border-b border-white/10 py-3" aria-hidden="true">
        <div
          className="flex w-max whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-white/55"
          style={{ animation: "pf-ticker 30s linear infinite" }}
        >
          <span>{TICKER.repeat(3)}</span>
          <span>{TICKER.repeat(3)}</span>
        </div>
      </div>

      {/* hero - studio statement + hard metadata, no decorative gradients */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-4xl font-bold leading-[1.08] sm:text-6xl"
          style={{ fontFamily: "var(--font-pf-display)" }}
        >
          Мы делаем игры. После релиза сами в них играем.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-widest text-white/70"
        >
          <span>Est. 2021 · Остин, Техас</span>
          <span>4 проекта</span>
          <span>PC · консоли</span>
        </motion.div>
      </section>

      {/* featured - one full-width poster block with committed colour */}
      <section className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[46vh] flex-col justify-end overflow-hidden p-8 sm:p-12"
          style={{
            background: "linear-gradient(160deg, #2d1650 0%, #14101f 55%), #14101f",
          }}
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
            style={{ background: "#a855f7" }}
          />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#c99cf5]">
            Флагман · второй сезон в разработке
          </span>
          <h2
            className="mt-3 text-5xl font-bold uppercase sm:text-7xl"
            style={{ fontFamily: "var(--font-pf-display)" }}
          >
            Ironbound
          </h2>
          <p className="mt-4 max-w-md text-white/75">
            Пошаговая тактика, где арена разрушается по ходу боя. План на три хода
            вперед здесь редко доживает до второго.
          </p>
        </motion.div>
      </section>

      {/* index - the Annapurna pattern: numbered title rows, colour arrives on hover */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-white/65">Все проекты</h2>
        <ul className="mt-6 border-t border-white/10">
          {games.map((g, i) => (
            <motion.li
              key={g.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div
                onMouseEnter={() => setHovered(g.title)}
                onMouseLeave={() => setHovered(null)}
                className="grid cursor-default grid-cols-[48px_1fr] items-baseline gap-4 border-b border-white/10 py-7 sm:grid-cols-[64px_1fr_auto_auto] sm:gap-8"
              >
                <span className="font-mono text-sm text-white/60">{g.idx}</span>
                <h3
                  className="text-2xl font-bold uppercase transition-colors duration-300 sm:text-4xl"
                  style={{
                    fontFamily: "var(--font-pf-display)",
                    color: hovered === g.title ? g.color : undefined,
                  }}
                >
                  {g.title}
                </h3>
                <span className="hidden font-mono text-xs uppercase tracking-widest text-white/70 sm:block">
                  {g.genre}
                </span>
                <span className="hidden font-mono text-xs text-white/60 sm:block">{g.year}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* press wall - mono pull-quotes, clearly attributed to fictional outlets */}
      <section className="border-t border-white/10 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-3">
          {[
            { quote: "«Тактика, в которой карта тоже противник.»", src: "Pixel Review*" },
            { quote: "«Nightfall Drift звучит так же хорошо, как выглядит.»", src: "Arcade Weekly*" },
            { quote: "«Echo Chamber, головоломка года по версии редакции.»", src: "PuzzleZine*" },
          ].map((p) => (
            <blockquote key={p.src}>
              <p className="text-lg leading-relaxed text-white/80">{p.quote}</p>
              <cite className="mt-3 block font-mono text-xs uppercase tracking-widest text-white/60 not-italic">
                - {p.src}
              </cite>
            </blockquote>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-6xl px-6 font-mono text-[10px] text-white/55">
          * цитаты и издания носят иллюстративный характер
        </p>
      </section>

      {/* newsletter - one committed input row, no fake submit */}
      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            className="text-2xl font-bold uppercase sm:text-3xl"
            style={{ fontFamily: "var(--font-pf-display)" }}
          >
            Напишем, когда будет что показать
          </h2>
          <form className="mt-6 flex max-w-md gap-0" onSubmit={(e) => e.preventDefault()}>
            <label className="flex-1">
              <span className="sr-only">Электронная почта</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-white/20 bg-transparent px-4 py-3 font-mono text-sm outline-none transition-colors placeholder:text-white/55 focus:border-[#a855f7]"
              />
            </label>
            <button
              type="submit"
              className="border border-l-0 border-white/20 bg-white px-6 font-mono text-xs uppercase tracking-widest text-[#0c0a10] transition-colors hover:bg-[#a855f7] hover:text-white"
            >
              Ок
            </button>
          </form>
          <p className="mt-3 font-mono text-[10px] text-white/55">демо: форма никуда не отправляет</p>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs text-white/65">
          <span className="font-bold uppercase tracking-[0.25em] text-white" style={{ fontFamily: "var(--font-pf-display)" }}>
            Pixelforge
          </span>
          <span>
            Сделано в студии{" "}
            <Link href="/" className="underline hover:text-white">
              megaumka.dev
            </Link>
            . Витрина работает на фронтенде, игры входят в нее как часть демонстрации.
          </span>
        </div>
      </footer>
    </div>
  );
}
