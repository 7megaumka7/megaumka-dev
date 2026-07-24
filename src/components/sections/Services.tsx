"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

// Одна услуга задает визуальную доминанту раздела - без неё все 7 карточек
// были равны по весу, и глазу не за что зацепиться в первые 3 секунды.
const HEADLINE_SERVICE = {
  title: "Веб-разработка полного цикла",
  body: "Одна команда ведет проект от идеи до продакшена: дизайн, фронтенд, бэкенд и деплой. То, что обсудили на созвоне, в тот же день попадает в код - пересказывать задачу новому человеку не приходится.",
};

// Bento layout - варьируем размер ячеек, а не цвет каждой: sage занят заголовочной
// карточкой (единственный сильный акцент раздела), rose/violet маркирует только одну
// смысловую группу - услуги, которые реально отличают от конкурентов. Остальные
// ячейки нейтральные, без рамок: деление идет заливкой и gap, а не border-клетками.
const SERVICE_ITEMS: { title: string; body: string; wide?: boolean; accent?: boolean }[] = [
  {
    title: "UI/UX дизайн",
    body: "Интерфейсы, которые не нужно объяснять пользователю: понятная иерархия, читаемая типографика, честная обратная связь на каждое действие.",
    wide: true,
  },
  {
    title: "Фронтенд-разработка",
    body: "React/Next.js. Перед сдачей каждый проект проверяем на контраст, клавиатурную навигацию и вес страницы.",
  },
  {
    title: "Бэкенд-разработка",
    body: "API, базы данных, авторизация. Каждый запрос к чужим данным сначала проходит проверку прав на уровне базы.",
  },
  {
    title: "Улучшение существующих сайтов",
    body: "Проводим аудит, редизайн и добавляем функциональность без переписывания всего с нуля.",
  },
  {
    title: "Моушн и 3D-акценты",
    body: "Легкая анимация на интеракциях и точечные 3D-сцены - то, что клиент замечает первым и запоминает дольше всего.",
    wide: true,
    accent: true,
  },
  {
    title: "Сайты, которые конвертят",
    body: "UX собирается вокруг одного целевого действия на странице: заявки, звонка, покупки. Всё остальное работает на него.",
    accent: true,
  },
  {
    title: "Видимость для Google и AI-агентов",
    body: "Sitemap, структурированные данные, регистрация в вебмастерах, llms.txt для ChatGPT, Perplexity, Claude.",
    wide: true,
    accent: true,
  },
];

const COMPARISON_ROWS: { criterion: string; us: string; them: string }[] = [
  { criterion: "Security-ревью", us: "включено по умолчанию", them: "отдельная платная опция" },
  { criterion: "Авторизация", us: "проверяется на уровне базы данных", them: "только в роутинге приложения" },
  { criterion: "Доступность интерфейса", us: "WCAG AA из коробки", them: "по отдельному запросу" },
  { criterion: "Темная/светлая тема", us: "есть везде", them: "часто отсутствует" },
  { criterion: "Контакт", us: "напрямую с разработчиком", them: "через менеджера-прослойку" },
];

const PRICING_TIERS = [
  {
    name: "Лендинг",
    price: "250 000 ₸",
    features: ["Одностраничный сайт", "Адаптивная верстка", "Форма связи", "Базовое SEO", "Срок: 1 неделя"],
  },
  {
    name: "Стандартный сайт",
    price: "700 000 ₸",
    features: ["Каталог или CMS", "Несколько разделов", "Интеграции с WhatsApp и почтой", "Темная/светлая тема", "Срок: 2–4 недели"],
    highlighted: true,
  },
  {
    name: "Про",
    price: "1 500 000 ₸",
    features: ["Сложная бизнес-логика", "Авторизация и роли", "Интеграция с оплатой", "Security-ревью", "Поддержка после сдачи"],
  },
];

// Не следующая ступень тарифной лестницы, а другая категория услуги - для сайтов,
// сделанных не нами. Одна компактная полоса вместо двух полноразмерных карточек,
// чтобы не спорить весом с основными тарифами.
const SECONDARY_SERVICES = [
  {
    name: "Улучшение действующего сайта",
    price: "120 000 ₸",
    description: "Аудит, точечный редизайн, скорость, доступность - без переписывания всего проекта.",
  },
  {
    name: "Индексация и видимость",
    price: "40 000 ₸",
    description: "Заводим сайт в Google, Bing и Яндекс и открываем его для AI-агентов.",
  },
];

export function Services() {
  const t = useT();

  function goToContact() {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="services" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-primary">{t.services.title}</h2>
        <p className="mt-3 max-w-2xl text-muted">{t.services.intro}</p>
      </Reveal>

      {/* headline card owns full-strength sage - the section's one anchor color.
          text-background (not text-white): dark-mode primary is a light green
          meant to be read as text, not filled under white - same contrast bug
          class fixed earlier in Hero/CtaBand this session. */}
      <Reveal delay={0.1} className="mt-10">
        <div className="rounded-2xl bg-primary p-6 text-background sm:p-8">
          <h3 className="text-2xl font-semibold">{HEADLINE_SERVICE.title}</h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-background/85">{HEADLINE_SERVICE.body}</p>
        </div>
      </Reveal>

      <Reveal delay={0.12} className="mt-1 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_ITEMS.map((item) => (
          <div
            key={item.title}
            className={`rounded-xl p-4 transition-colors duration-200 ${
              item.wide ? "sm:col-span-2" : ""
            } ${item.accent ? "bg-violet-tint" : "bg-surface-2"}`}
          >
            {item.accent && (
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-violet">
                Отличает от конкурентов
              </span>
            )}
            <h3 className={`text-sm font-semibold ${item.accent ? "text-violet" : "text-foreground"}`}>
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </Reveal>

      {/* honest anti-list as plain text, not another bordered box - narrow scope
          reads as expertise, and one fewer box keeps the section from piling up */}
      <Reveal delay={0.16} className="mt-4 text-sm leading-relaxed text-muted">
        <span className="font-semibold text-foreground">Чего мы не делаем:</span> SMM, контекстную рекламу и
        брендбуки с миссией компании. Это отдельные профессии, и делать их «заодно» было бы халтурой. Если вам
        это нужно, честно скажем и подскажем, у кого заказать.
      </Reveal>

      {/* comparison as two colored panels, not a striped table - the verdict
          reads instantly from the fill, not from parsing rows */}
      <Reveal delay={0.15} className="mt-16">
        <h3 className="text-xl font-semibold text-foreground">
          <span className="text-primary">{t.services.comparisonUs}</span> {t.services.comparisonTitle}
        </h3>
        <div className="mt-5 grid gap-0.5 overflow-hidden rounded-2xl sm:grid-cols-2">
          <div className="bg-primary-tint p-6">
            {COMPARISON_ROWS.map((row) => (
              <div key={row.criterion} className="flex gap-2 py-2 text-[13.5px] leading-relaxed">
                <CheckIcon className="text-primary" />
                <span>
                  <span className="block font-semibold text-foreground">{row.criterion}</span>
                  {row.us}
                </span>
              </div>
            ))}
          </div>
          {/* danger-tint, not neutral gray: these are the downsides of the
              other option, and the panel should read as "avoid" at a glance,
              the same way the left panel reads as "yes" from its green fill */}
          <div className="bg-danger-tint p-6">
            {COMPARISON_ROWS.map((row) => (
              <div key={row.criterion} className="flex gap-2 py-2 text-[13.5px] leading-relaxed">
                <CrossIcon className="text-danger" />
                <span className="font-semibold text-foreground">{row.them}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-16">
        <h3 className="text-xl font-semibold text-foreground">{t.services.pricingTitle}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <CheckIcon /> {t.services.pricingNote}
        </p>
        <div className="mt-5 grid gap-0.5 overflow-hidden rounded-2xl sm:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col p-6 ${tier.highlighted ? "bg-primary text-background" : "bg-surface-2"}`}
            >
              {tier.highlighted && (
                <span className="mb-2.5 w-fit rounded-full bg-primary-dim px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-background">
                  Чаще всего выбирают
                </span>
              )}
              <h4 className="font-semibold">{tier.name}</h4>
              <p className="mt-2 text-2xl font-bold">
                <span className={`text-sm font-normal ${tier.highlighted ? "text-background/85" : "text-muted"}`}>
                  {t.services.priceFrom}
                </span>{" "}
                {tier.price}
              </p>
              <ul className={`mt-4 flex-1 space-y-2 text-sm ${tier.highlighted ? "text-background/90" : "text-muted"}`}>
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <CheckIcon /> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goToContact}
                className={`mt-6 rounded-lg px-4 py-2.5 text-sm font-medium transition duration-200 active:scale-[0.97] ${
                  tier.highlighted
                    ? "bg-background text-primary hover:opacity-90"
                    : "border border-border text-foreground hover:border-violet hover:bg-violet-tint"
                }`}
              >
                {t.services.ctaOrder}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-2 rounded-2xl border border-dashed border-border">
          <p className="px-5 pt-3 text-xs font-semibold uppercase tracking-wide text-muted">Не новый сайт с нуля?</p>
          {SECONDARY_SERVICES.map((s, i) => (
            <div
              key={s.name}
              className={`flex flex-col items-start justify-between gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-4 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <div>
                <h4 className="font-semibold text-foreground">
                  {s.name} <span className="font-normal text-muted">от {s.price}</span>
                </h4>
                <p className="mt-0.5 max-w-md text-sm text-muted">{s.description}</p>
              </div>
              <button
                type="button"
                onClick={goToContact}
                className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-violet"
              >
                {t.services.ctaOrder} →
              </button>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`mt-0.5 h-4 w-4 shrink-0 text-primary ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}

function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`mt-0.5 h-4 w-4 shrink-0 text-muted ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}
