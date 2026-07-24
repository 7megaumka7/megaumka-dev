"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

// Numbered process steps with honest durations - the trust pattern every KZ studio
// (A-LUX, ABC Design, IMA) leads with. Long copy stays Russian per the i18n pattern.
const STEPS: { title: string; body: string; duration: string }[] = [
  {
    title: "Заявка",
    body: "Пишете пару строк о задаче. Отвечает разработчик, уточняющих созвонов-каруселей не будет.",
    duration: "в тот же день",
  },
  {
    title: "Оценка и договор",
    body: "Считаем объем, называем цену и срок. Оба числа попадают в договор и по ходу проекта не растут.",
    duration: "1–2 дня",
  },
  {
    title: "Дизайн",
    body: "Подбираем референсы под вашу нишу и собираем под них макет. Показываем на реальном контенте, без рыбы.",
    duration: "3–7 дней",
  },
  {
    title: "Разработка",
    body: "Фронтенд и бэкенд идут параллельно. Раз в несколько дней присылаем ссылку на живую сборку.",
    duration: "1–3 недели",
  },
  {
    title: "Security-ревью",
    body: "Пентестер проходит по проекту как атакующий: права, ввод, файлы, ошибки. Это в цене, отдельно не продаем.",
    duration: "2–3 дня",
  },
  {
    title: "Сдача и гарантия",
    body: "Деплой, передача доступов, месяц правок после сдачи. Дальше подключаем поддержку по договоренности.",
    duration: "1 день",
  },
];

export function Process() {
  const t = useT();

  return (
    <section id="process" className="scroll-mt-24 bg-primary-tint/40 py-28">
      <div className="mx-auto max-w-5xl px-6">
        {/* floated square, not gridded - the intro text wraps around it, then
            the cards grid resumes full width below the clear */}
        <Reveal delay={0.15} className="hidden float-right ml-6 mb-4 lg:block">
          <Image src="/bear-process.png" alt="" width={200} height={200} className="rounded-2xl" aria-hidden="true" />
        </Reveal>

        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-primary">{t.process.title}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t.process.intro}</p>
        </Reveal>

        <div className="clear-both" />

        <Reveal delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="rounded-xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-violet hover:bg-violet-tint/40"
            >
              <div className="flex items-baseline justify-between gap-3">
                {/* aria-hidden only takes it out of the screen-reader tree - WCAG
                    contrast still applies to anything visibly rendered, so the
                    "ghost number" still needs real contrast, not just a low opacity */}
                <span className="font-mono text-2xl font-bold text-primary/70" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-muted">{s.duration}</span>
              </div>
              <h3 className="mt-2 font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
