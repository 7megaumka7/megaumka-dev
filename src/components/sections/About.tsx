"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

export function About() {
  const t = useT();

  function goToProjects() {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="about" className="mx-auto max-w-2xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-primary">{t.about.title}</h2>
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
    </section>
  );
}
