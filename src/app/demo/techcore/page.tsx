"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";

// Engineering-minimal reference: Nothing / Teenage Engineering - light utilitarian
// surface, fine gridlines, monospace index labels, product as technical drawing with
// dimension lines instead of a glamour render. One committed accent.
const BLUE = "#2563eb";

const products = [
  { idx: "TC-01", name: "Смартфон Core", spec: "6.4″ OLED · 120 Гц · 256 ГБ", price: "349 000 ₸" },
  { idx: "TC-02", name: "Наушники Core Air", spec: "ANC · 32 ч · USB-C", price: "42 000 ₸" },
  { idx: "TC-03", name: "Смарт-часы Core", spec: "AMOLED · GPS · 7 дней", price: "128 000 ₸" },
  { idx: "TC-04", name: "Ноутбук Core", spec: "14″ · 16 ГБ · 1 ТБ SSD", price: "589 000 ₸" },
  { idx: "TC-05", name: "Планшет Core Mini", spec: "8.7″ · стилус в комплекте", price: "210 000 ₸" },
  { idx: "TC-06", name: "Зарядное устройство", spec: "65 Вт · GaN · 2×USB-C", price: "12 000 ₸" },
] as const;

const SPECS = [
  ["Дисплей", "6.4″ OLED, 2670×1200, 120 Гц"],
  ["Процессор", "8 ядер, 4 нм"],
  ["Память", "12 ГБ + 256 ГБ"],
  ["Батарея", "5 100 мА·ч, 65 Вт"],
  ["Корпус", "алюминий, IP68"],
] as const;

const VARIANTS = [
  { name: "графит", hex: "#26262b" },
  { name: "туман", hex: "#c7c9c4" },
  { name: "шалфей", hex: "#7d8b74" },
] as const;

// Utilitarian barcode - the Teenage Engineering footer signature.
function Barcode({ className = "" }: { className?: string }) {
  const bars = [2, 1, 3, 1, 1, 2, 1, 4, 1, 2, 2, 1, 3, 1, 1, 1, 2, 1, 1, 3, 1, 2];
  let x = 0;
  return (
    <svg viewBox="0 0 60 16" className={className} aria-hidden="true">
      {bars.map((w, i) => {
        const rect = <rect key={i} x={x} y="0" width={w} height="16" fill={i % 2 === 0 ? "currentColor" : "none"} />;
        x += w;
        return rect;
      })}
    </svg>
  );
}

// Technical drawing of the phone: outline + dimension lines with mono annotations -
// the Teenage Engineering way of showing a product without a photograph.
function PhoneDrawing() {
  return (
    <svg viewBox="0 0 300 420" className="h-full w-full" fill="none" aria-hidden="true">
      {/* body */}
      <rect x="80" y="40" width="140" height="300" rx="18" stroke="#111" strokeWidth="1.5" />
      <rect x="92" y="52" width="116" height="276" rx="8" stroke="#111" strokeWidth="0.75" opacity="0.4" />
      <circle cx="150" cy="66" r="4" stroke="#111" strokeWidth="1" />
      <rect x="222" y="110" width="4" height="34" rx="2" stroke="#111" strokeWidth="1" />
      {/* camera detail */}
      <circle cx="110" cy="80" r="9" stroke="#111" strokeWidth="1" />
      <circle cx="110" cy="80" r="4" stroke="#111" strokeWidth="1" opacity="0.5" />
      {/* dimension: height */}
      <g stroke={BLUE} strokeWidth="1">
        <line x1="52" y1="40" x2="52" y2="340" />
        <line x1="46" y1="40" x2="76" y2="40" />
        <line x1="46" y1="340" x2="76" y2="340" />
      </g>
      <text x="30" y="196" fill={BLUE} fontSize="11" fontFamily="monospace" transform="rotate(-90 30 196)">
        158.2 mm
      </text>
      {/* dimension: width */}
      <g stroke={BLUE} strokeWidth="1">
        <line x1="80" y1="372" x2="220" y2="372" />
        <line x1="80" y1="366" x2="80" y2="378" />
        <line x1="220" y1="366" x2="220" y2="378" />
      </g>
      <text x="122" y="392" fill={BLUE} fontSize="11" fontFamily="monospace">
        74.6 mm
      </text>
      {/* callout */}
      <g stroke={BLUE} strokeWidth="1">
        <line x1="119" y1="80" x2="252" y2="80" strokeDasharray="3 3" />
        <circle cx="252" cy="80" r="2" fill={BLUE} />
      </g>
      <text x="232" y="72" fill={BLUE} fontSize="10" fontFamily="monospace">
        50 MP
      </text>
    </svg>
  );
}

export default function TechCorePage() {
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>(VARIANTS[0]);

  return (
    <div className="min-h-screen bg-[#efefed] text-[#111114]">
      {/* fine engineering grid over the whole page */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,17,20,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,20,0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <header className="relative border-b border-[#111114]/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-mono text-sm font-semibold uppercase tracking-widest">
            TechCore<span style={{ color: BLUE }}>®</span>
          </span>
          <nav className="hidden gap-6 font-mono text-xs uppercase tracking-widest text-[#4b4b53] sm:flex">
            <a href="#catalog" className="transition-colors hover:text-[#111114]">
              Каталог
            </a>
            <a href="#specs" className="transition-colors hover:text-[#111114]">
              Спецификации
            </a>
          </nav>
          <Link href="/#projects" className="text-xs text-[#4b4b53] transition-colors hover:text-[#111114]">
            ← портфолио megaumka.dev
          </Link>
        </div>
      </header>

      {/* hero - technical drawing right, lowercase statement left, mono metadata */}
      <section className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#55555e]">
            core phone 12 - вып. 03/2026
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl"
          >
            техника
            <br />
            без лишнего<span style={{ color: BLUE }}>.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-md leading-relaxed text-[#3f3f47]"
          >
            В каталоге шесть позиций, и это осознанно. Про каждую показываем главное:
            чертеж, размеры, цену. Глянцевые рендеры в три четверти оставим другим магазинам.
          </motion.p>
          {/* variant selector - a real state toggle mirrored in the drawing caption */}
          <div className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#55555e]">
              корпус - {variant.name}
            </p>
            <div className="mt-2.5 flex gap-2.5">
              {VARIANTS.map((v) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setVariant(v)}
                  aria-label={`Цвет корпуса: ${v.name}`}
                  aria-pressed={variant.name === v.name}
                  className={`h-7 w-7 rounded-full border-2 transition-all ${
                    variant.name === v.name
                      ? "scale-110 border-[#2563eb]"
                      : "border-[#111114]/20 hover:border-[#111114]/50"
                  }`}
                  style={{ background: v.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <a
              href="#catalog"
              className="px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85"
              style={{ background: "#111114" }}
            >
              Смотреть каталог
            </a>
            <span className="font-mono text-xs text-[#55555e]">6 позиций</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative min-h-[420px] border border-[#111114]/15 bg-white"
        >
          <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-widest text-[#55555e]">
            фиг. 1 - габаритный чертеж · {variant.name}
          </span>
          <span
            className="absolute right-4 top-3 h-4 w-4 rounded-full border border-[#111114]/20"
            style={{ background: variant.hex }}
            aria-hidden="true"
          />
          <PhoneDrawing />
        </motion.div>
      </section>

      {/* catalog - an index table, not a card wall: mono row numbers, hairline rules */}
      <section id="catalog" className="relative border-t border-[#111114]/15 bg-white/60 py-20 backdrop-blur-[1px]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#55555e]">01 - каталог</h2>
            <span className="font-mono text-xs text-[#55555e]">цены - от</span>
          </div>
          <ul className="mt-8 border-t border-[#111114]/15">
            {products.map((p, i) => (
              <motion.li
                key={p.idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="group grid grid-cols-[56px_1fr_auto] items-baseline gap-4 border-b border-[#111114]/15 py-5 transition-colors hover:bg-white sm:grid-cols-[72px_1.2fr_1fr_auto]"
              >
                <span className="font-mono text-xs text-[#55555e] transition-colors group-hover:text-[#2563eb]">
                  {p.idx}
                </span>
                <h3 className="text-lg font-medium tracking-tight">{p.name}</h3>
                <span className="hidden font-mono text-xs text-[#55555e] sm:block">{p.spec}</span>
                <span className="font-mono text-sm tabular-nums">{p.price}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* flagship spec sheet - label/value hairline table */}
      <section id="specs" className="relative py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#55555e]">
            02 - спецификации · core phone 12
          </h2>
          <dl className="mt-8 max-w-2xl border-t border-[#111114]/15">
            {SPECS.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[140px_1fr] gap-6 border-b border-[#111114]/15 py-4 sm:grid-cols-[200px_1fr]"
              >
                <dt className="font-mono text-xs uppercase tracking-widest text-[#55555e]">{label}</dt>
                <dd className="text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="relative border-t border-[#111114]/15 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 font-mono text-xs text-[#4b4b53]">
          <span className="flex items-center gap-4">
            <span className="uppercase tracking-widest">
              TechCore<span style={{ color: BLUE }}>®</span>
            </span>
            <Barcode className="h-4 w-16 text-[#111114]/60" />
          </span>
          <span>
            сделано в студии{" "}
            <Link href="/" className="underline hover:text-[#111114]">
              megaumka.dev
            </Link>
            . витрина на фронтенде, без бэкенда
          </span>
        </div>
      </footer>
    </div>
  );
}
