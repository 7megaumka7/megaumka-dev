"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

const SERVICE_ITEMS = [
  {
    title: "Веб-разработка полного цикла",
    body: "Один человек ведет проект от идеи до продакшена: дизайн, фронтенд, бэкенд и деплой. Ничего не теряется при передаче между специалистами.",
  },
  {
    title: "UI/UX дизайн",
    body: "Интерфейсы, которые не нужно объяснять пользователю: понятная иерархия, читаемая типографика, честная обратная связь на каждое действие.",
  },
  {
    title: "Фронтенд-разработка",
    body: "React/Next.js, доступность интерфейса и производительность входят в приемку по умолчанию, а не идут отдельной опцией: контраст, клавиатурная навигация, бюджет на бандл.",
  },
  {
    title: "Бэкенд-разработка",
    body: "Проектируем API, базы данных и авторизацию с акцентом на оптимизацию и безопасность по лучшим практикам: права проверяются на уровне БД, а не только в роутинге.",
  },
  {
    title: "Улучшение существующих сайтов",
    body: "Проводим аудит, редизайн и добавляем функциональность без переписывания всего с нуля: меняем точечно, там, где это реально нужно.",
  },
  {
    title: "Сайты, которые конвертят",
    body: "UX собирается вокруг одного целевого действия на странице, а не вокруг количества блоков. Чем меньше кликов до заявки, тем больше заявок с того же трафика.",
  },
  {
    title: "Моушн и 3D-акценты",
    body: "Добавляем легкую анимацию на интеракциях, вроде карусели проектов на этом сайте, и точечные 3D-сцены на react-three-fiber там, где они реально усиливают продукт. Автоплей-видео ради эффекта не делаем.",
  },
  {
    title: "Индексация в Google и видимость для AI-агентов",
    body: "Настраиваем sitemap, robots.txt и структурированные данные, регистрируем сайт в Google Search Console и Bing Webmaster Tools, добавляем llms.txt и разрешаем AI-краулерам (ChatGPT, Perplexity, Claude) находить и цитировать сайт.",
  },
];

const COMPARISON_ROWS: { criterion: string; us: string; them: string }[] = [
  { criterion: "Security-ревью", us: "включено по умолчанию", them: "отдельная платная опция" },
  { criterion: "Авторизация", us: "проверяется на уровне базы данных", them: "только в роутинге приложения" },
  { criterion: "Маркировка кейсов", us: "рабочие и концепт честно разделены", them: "только «истории успеха»" },
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
  {
    name: "Улучшение действующего сайта",
    price: "120 000 ₸",
    features: [
      "Аудит дизайна и безопасности",
      "Точечный редизайн без переписывания",
      "Ускорение загрузки страниц",
      "Темная тема и мобильный адаптив",
      "Доступность до WCAG AA",
      "Индексация в Google, Bing и Яндексе",
      "Отчет: что нашли и что починили",
    ],
  },
  {
    name: "Индексация и видимость",
    price: "40 000 ₸",
    features: [
      "Sitemap, robots.txt, структурированные данные",
      "Регистрация в Google Search Console, Bing Webmaster, Яндекс.Вебмастере",
      "Запрос индексации всех страниц",
      "llms.txt и разрешения для AI-краулеров",
      "Для сайтов, сделанных не нами",
    ],
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

      <Reveal delay={0.1} className="mt-10 grid gap-4 sm:grid-cols-2">
        {SERVICE_ITEMS.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-violet hover:bg-violet-tint"
          >
            <h3 className="font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </Reveal>

      {/* honest anti-list - the focus statement top agencies imply, said out loud.
          Narrow scope reads as expertise, not as a gap. */}
      <Reveal delay={0.12} className="mt-6 rounded-xl border border-dashed border-border bg-surface-2/50 p-5">
        <h3 className="font-semibold text-foreground">Чего мы не делаем</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          SMM, контекстную рекламу и брендбуки с миссией компании. Это отдельные профессии,
          и делать их «заодно» было бы халтурой. Если вам это нужно, честно скажем и
          подскажем, у кого заказать.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-16">
        <h3 className="text-xl font-semibold text-foreground">
          <span className="text-primary">{t.services.comparisonUs}</span> {t.services.comparisonTitle}
        </h3>
        <div className="mt-5 overflow-hidden rounded-xl border border-border">
          {/* header row - column labels only make sense once rows are actually side-by-side */}
          <div className="hidden bg-surface-2 text-xs font-semibold uppercase tracking-wide text-muted sm:grid sm:grid-cols-[1.2fr_1fr_1fr]">
            <div className="px-4 py-3" />
            <div className="px-4 py-3 text-primary">{t.services.comparisonUs}</div>
            <div className="px-4 py-3">{t.services.comparisonThem}</div>
          </div>
          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={row.criterion}
              className={`grid grid-cols-1 gap-1 px-4 py-3 text-sm transition-colors duration-200 hover:bg-violet-tint sm:grid-cols-[1.2fr_1fr_1fr] sm:gap-0 sm:px-0 sm:py-0 ${
                i % 2 === 1 ? "bg-surface-2/50" : "bg-surface"
              }`}
            >
              <div className="font-medium text-foreground sm:px-4 sm:py-3">{row.criterion}</div>
              <div className="flex items-start gap-1.5 text-foreground sm:px-4 sm:py-3">
                <CheckIcon />{" "}
                <span>
                  <span className="text-primary sm:hidden">{t.services.comparisonUs}: </span>
                  {row.us}
                </span>
              </div>
              <div className="flex items-start gap-1.5 text-muted sm:px-4 sm:py-3">
                <CrossIcon />{" "}
                <span>
                  <span className="sm:hidden">{t.services.comparisonThem}: </span>
                  {row.them}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-16">
        <h3 className="text-xl font-semibold text-foreground">{t.services.pricingTitle}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <CheckIcon /> {t.services.pricingNote}
        </p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-xl border p-6 transition-colors duration-200 hover:border-violet ${
                tier.highlighted ? "border-primary-dim bg-primary-tint" : "border-border bg-surface"
              }`}
            >
              <h4 className="font-semibold text-foreground">{tier.name}</h4>
              <p className="mt-2 text-2xl font-bold text-foreground">
                <span className="text-sm font-normal text-muted">{t.services.priceFrom}</span> {tier.price}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <CheckIcon /> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goToContact}
                className={`mt-6 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  tier.highlighted
                    ? "bg-primary text-white hover:bg-violet hover:text-background"
                    : "border border-border text-foreground hover:border-violet hover:bg-violet-tint"
                }`}
              >
                {t.services.ctaOrder}
              </button>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}
