"use client";

import { BearAudit } from "@/components/motion/BearAudit";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

export function About() {
  const t = useT();

  function goToProjects() {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="about" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-primary">{t.about.title}</h2>
      </Reveal>

      {/* floated, not gridded - text wraps around the round silhouette
          (shape-outside) instead of sitting in a rigid side column, so the
          page feels less like stacked cards and more like a real layout */}
      <Reveal
        delay={0.15}
        className="float-right ml-6 mb-4 mt-6 w-36 sm:w-48 [shape-outside:circle(48%)]"
      >
        <BearAudit className="block h-36 w-36 sm:h-48 sm:w-48" />
      </Reveal>

      <Reveal delay={0.1} className="mt-6 space-y-5 leading-relaxed text-muted">
        <p>
          megaumka.dev началась с пентеста. Основатель студии больше 4 лет в
          информационной безопасности, с сертификатом OSCP: ломал чужие системы по контракту,
          пока не стало интереснее строить такие, о которых нечего писать в отчете.
          Вокруг этой идеи и собралась команда.
        </p>
        <p>
          На практике это выглядит так: авторизация проверяется там, где реально
          происходит доступ к данным. Внешнему вводу по умолчанию никто не верит.
          Ошибки не выносят наружу детали стека. Для нас это обычная планка сдачи,
          в смету отдельной строкой она не попадает.
        </p>
        <p>
          Базируемся в Астане, часть команды работает удаленно: от Алматы до Лос-Анджелеса.
          Поэтому проекты в портфолио говорят на двух языках и живут в разных
          часовых поясах.
        </p>
        <p>
          В разделе{" "}
          <button type="button" onClick={goToProjects} className="text-primary hover:underline">
            проектов
          </button>{" "}
          собраны продакшн-магазин и пять живых витрин студии: у каждой настоящие
          скриншоты и открывающаяся страница.
        </p>
      </Reveal>
      <div className="clear-both" />
    </section>
  );
}
