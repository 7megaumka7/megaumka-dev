"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lora, Caveat } from "next/font/google";

// Warm-commerce reference: Flowwow (Shuka rebrand) / Etsy - light cream surface,
// each product on its own pastel tile, friendly serif display, seller identity
// (handwritten name + moderation badge) carried on every card.
const serif = Lora({ weight: ["500", "600"], subsets: ["cyrillic", "latin"], variable: "--font-uzel-serif" });
const hand = Caveat({ weight: ["500", "700"], subsets: ["cyrillic", "latin"], variable: "--font-uzel-hand" });

const CATEGORIES = ["Керамика", "Текстиль", "Дерево", "Кожа", "Свечи", "Украшения"] as const;

const listings = [
  { name: "Керамическая кружка ручной лепки", seller: "Мастерская Глина", price: "6 500 ₸", verified: true, tile: "#f3e3d3", icon: "mug" },
  { name: "Вязаный шарф из мериноса", seller: "Шерсть и нить", price: "12 000 ₸", verified: true, tile: "#e5e9dc", icon: "scarf" },
  { name: "Деревянная разделочная доска", seller: "Дерево+", price: "9 200 ₸", verified: true, tile: "#ece1cf", icon: "board" },
  { name: "Кожаный блокнот ручной работы", seller: "КожаКрафт", price: "8 800 ₸", verified: false, tile: "#e9dcd7", icon: "notebook" },
  { name: "Серьги из полимерной глины", seller: "Мастерская Глина", price: "3 400 ₸", verified: true, tile: "#f0e2e0", icon: "earrings" },
  { name: "Свеча соевая ароматическая", seller: "Теплый воск", price: "2 900 ₸", verified: true, tile: "#ede8da", icon: "candle" },
] as const;

// Line-art product icons - hand-drawn weight (1.5px, rounded caps), one per craft type,
// standing in for photography without pretending to be it.
function ProductIcon({ kind, className = "" }: { kind: string; className?: string }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {kind === "mug" && (
        <g {...stroke}>
          <path d="M18 22 h22 v20 a6 6 0 0 1-6 6 h-10 a6 6 0 0 1-6-6 z" />
          <path d="M40 26 h4 a5 5 0 0 1 0 10 h-4" />
          <path d="M24 18 c0-3 2-3 2-6 M32 18 c0-3 2-3 2-6" />
        </g>
      )}
      {kind === "scarf" && (
        <g {...stroke}>
          <path d="M20 14 h24 v14 c0 6-8 6-12 10 s-4 12-4 18" />
          <path d="M28 56 h-8 M20 14 v10" />
          <path d="M24 20 h16 M24 26 h14" opacity="0.5" />
        </g>
      )}
      {kind === "board" && (
        <g {...stroke}>
          <rect x="18" y="20" width="28" height="34" rx="4" />
          <circle cx="32" cy="14" r="4" />
          <path d="M32 18 v2 M24 30 h16 M24 38 h16" opacity="0.5" />
        </g>
      )}
      {kind === "notebook" && (
        <g {...stroke}>
          <rect x="20" y="14" width="26" height="36" rx="3" />
          <path d="M26 14 v36" opacity="0.5" />
          <path d="M32 26 h8 M32 32 h8" opacity="0.5" />
          <path d="M20 22 h-3 M20 32 h-3 M20 42 h-3" />
        </g>
      )}
      {kind === "earrings" && (
        <g {...stroke}>
          <circle cx="24" cy="20" r="4" />
          <circle cx="40" cy="20" r="4" />
          <path d="M24 24 v6 l-4 8 a6 6 0 1 0 8 0 z M40 24 v6 l-4 8 a6 6 0 1 0 8 0 z" />
        </g>
      )}
      {kind === "candle" && (
        <g {...stroke}>
          <rect x="22" y="26" width="20" height="26" rx="3" />
          <path d="M32 26 v-6" />
          <path d="M32 12 c-3 3-3 6 0 8 c3-2 3-5 0-8 z" />
          <path d="M26 34 h12" opacity="0.5" />
        </g>
      )}
    </svg>
  );
}

function HeartIcon({ filled, className = "" }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21c-4.8-3.6-8-6.6-8-10a4.6 4.6 0 0 1 8-3.2A4.6 4.6 0 0 1 20 11c0 3.4-3.2 6.4-8 10z" />
    </svg>
  );
}

export default function UzelPage() {
  // favourites live in page state - a real toggle, not a decorative icon
  const [faves, setFaves] = useState<Set<string>>(new Set());

  function toggleFave(name: string) {
    setFaves((cur) => {
      const next = new Set(cur);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <div className={`${serif.variable} ${hand.variable} min-h-screen bg-[#faf6f0] text-[#2b241d]`}>
      {/* header - wordmark + real search field (the marketplace anchor element) */}
      <header className="border-b border-[#2b241d]/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
          <span className="text-3xl text-[#b4632c]" style={{ fontFamily: "var(--font-uzel-hand)" }}>
            Узел
          </span>
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Поиск по товарам</span>
            <input
              type="search"
              placeholder="Искать среди 2 400 работ мастеров…"
              className="w-full rounded-full border border-[#2b241d]/20 bg-white px-5 py-2.5 text-sm outline-none transition-colors placeholder:text-[#655b4e] focus:border-[#b4632c]"
            />
            <svg
              viewBox="0 0 20 20"
              className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#655b4e]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="m14 14 4 4" strokeLinecap="round" />
            </svg>
          </label>
          <span
            role="status"
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2b241d]/20 text-[#8a4a20]"
            aria-label={`В избранном: ${faves.size}`}
          >
            <HeartIcon filled={faves.size > 0} className="h-4 w-4" />
            <AnimatePresence>
              {faves.size > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b4632c] text-[9px] font-bold text-white"
                >
                  {faves.size}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <Link
            href="/#projects"
            className="shrink-0 text-xs text-[#655b4e] transition-colors hover:text-[#2b241d]"
          >
            ← портфолио megaumka.dev
          </Link>
        </div>
        {/* category chips - the Etsy/Flowwow browse row */}
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 pb-4 [scrollbar-width:none]">
          {CATEGORIES.map((c, i) => (
            <button
              key={c}
              type="button"
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                i === 0
                  ? "border-[#2b241d] bg-[#2b241d] text-[#faf6f0]"
                  : "border-[#2b241d]/20 hover:border-[#2b241d]/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      {/* hero - editorial serif statement, moderation promise as the trust line */}
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-4xl leading-[1.1] sm:text-6xl"
          style={{ fontFamily: "var(--font-uzel-serif)" }}
        >
          Хендмейд из Алматы, <span className="text-[#b4632c]">с именем мастера</span> на каждой
          карточке.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl leading-relaxed text-[#57503f]"
        >
          Площадка мастеров из Алматы и окрестностей. Прежде чем мастер опубликует
          первую работу, кто-то из нашей команды смотрит ее вживую. Поэтому значок
          «проверено» появляется не сразу, зато он что-то значит.
        </motion.p>
      </section>

      {/* catalog - pastel tiles (each product owns a colour), line-art object,
          seller signature in handwriting + moderation state on every card */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex items-baseline justify-between border-b border-[#2b241d]/10 pb-3">
          <h2 className="text-xl" style={{ fontFamily: "var(--font-uzel-serif)" }}>
            Новые работы
          </h2>
          <span className="text-xs text-[#6b6154]">6 товаров · 5 мастеров</span>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              className="group"
            >
              <div
                className="relative flex aspect-[4/3] items-center justify-center rounded-2xl text-[#2b241d]/70 transition-transform duration-300 group-hover:-translate-y-1.5"
                style={{ background: item.tile }}
              >
                <ProductIcon kind={item.icon} className="h-20 w-20" />
                <button
                  type="button"
                  onClick={() => toggleFave(item.name)}
                  aria-label={faves.has(item.name) ? `Убрать из избранного: ${item.name}` : `В избранное: ${item.name}`}
                  aria-pressed={faves.has(item.name)}
                  className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur transition-all hover:scale-110 ${
                    faves.has(item.name) ? "text-[#b4632c]" : "text-[#655b4e]"
                  }`}
                >
                  <HeartIcon filled={faves.has(item.name)} className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium leading-snug">{item.name}</h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      className="text-lg leading-none text-[#57503f]"
                      style={{ fontFamily: "var(--font-uzel-hand)" }}
                    >
                      {item.seller}
                    </span>
                    {item.verified ? (
                      <span className="rounded-full bg-[#4f7442]/10 px-2 py-0.5 text-[10px] font-medium text-[#4a6b3e]">
                        ✓ проверено
                      </span>
                    ) : (
                      <span className="rounded-full bg-[#2b241d]/5 px-2 py-0.5 text-[10px] text-[#6b6154]">
                        на модерации
                      </span>
                    )}
                  </div>
                </div>
                <p className="shrink-0 text-sm font-semibold" style={{ fontFamily: "var(--font-uzel-serif)" }}>
                  {item.price}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* master of the week - the marketplace's editorial voice: a real person plaque,
          handwriting as the signature, not another product card */}
      <section className="border-t border-[#2b241d]/10 bg-[#f3ece2] py-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-8 px-6 sm:flex-nowrap">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#b4632c]/15 text-[#b4632c]">
            <ProductIcon kind="mug" className="h-12 w-12" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#6b6154]">Мастер недели</p>
            <p className="mt-2 text-3xl text-[#2b241d]" style={{ fontFamily: "var(--font-uzel-hand)" }}>
              «Каждую кружку я леплю дольше, чем она едет к покупателю.»
            </p>
            <p className="mt-2 text-sm text-[#5f5649]">
              Мастерская Глина · керамика · на площадке с 2024 года · 214 продаж
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2b241d]/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs text-[#6b6154]">
          <span style={{ fontFamily: "var(--font-uzel-hand)" }} className="text-2xl text-[#8a4a20]">
            Узел
          </span>
          <span>
            Сделано в студии{" "}
            <Link href="/" className="underline hover:text-[#2b241d]">
              megaumka.dev
            </Link>
            . Витрина работает на фронтенде, без бэкенда.
          </span>
        </div>
      </footer>
    </div>
  );
}
