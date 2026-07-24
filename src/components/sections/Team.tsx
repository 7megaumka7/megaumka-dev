"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

// Team bios follow the register of real security-firm team pages (FRSecure, Rapid7,
// BreachLock): concrete facts over adjectives, certifications listed separately from
// the tech stack so a credential never reads like a JS framework.
// Long-form bios are Russian-only, matching the site's long-content i18n pattern.
const MEMBERS: {
  name: string;
  role: string;
  location: string;
  story: string;
  stack: string[];
  security?: string[];
}[] = [
  {
    name: "Алишер",
    role: "Основатель · пентест и бэкенд",
    location: "Астана",
    story:
      "Больше 4 лет в информационной безопасности: пентест по контракту, по выходным занимался багбаунти. Потом надоело писать отчеты о чужих дырах и стало интереснее строить так, чтобы отчет оказался пустым. Бэкенд пишет с вопросом «как это будут ломать» вместо «как это будет работать».",
    stack: ["Node.js", "PostgreSQL", "Prisma", "Docker"],
    security: ["OSCP", "4+ лет в ИБ", "багбаунти"],
  },
  {
    name: "Аяна",
    role: "Дизайн и фронтенд",
    location: "Алматы",
    story:
      "До кода рисовала вывески и меню для кофеен в Алматы. К верстке относится так же: если секцию не понять за секунду с трех метров, переделывает. Проверяет контраст и клавиатурную навигацию раньше, чем их спросит axe.",
    stack: ["React", "Next.js", "Tailwind CSS", "Figma"],
    security: ["WCAG AA как норма сдачи"],
  },
  {
    name: "Данияр",
    role: "Фуллстек и интеграции",
    location: "Астана",
    story:
      "Первым продакшн-проектом был интернет-магазин, переехавший из Excel-файла на 40 000 строк. С тех пор не боится ни чужих баз, ни чужих CSV, ни «у нас тут немного legacy». Больше всего любит интеграции, которые «никто не смог подключить».",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "REST/Webhooks"],
  },
  {
    name: "Mike",
    role: "Моушн и фронтенд",
    location: "Лос-Анджелес",
    story:
      "Пять лет делал сайты фитнес-студиям в Лос-Анджелесе, оттуда в портфолио и появился FitPulse, а заодно слабость к жирным заголовкам. Работает из LA, так что пока Астана спит, у проекта уже готов новый моушн. Анимации принципиально проверяет на телефоне трехлетней давности.",
    stack: ["Motion", "React", "CSS-анимации"],
  },
];

// Each member gets a flat-vector initial badge instead of a stock photo - real
// named people without provided headshots shouldn't get invented faces. Colour
// cycles through the site's three accents so four cards don't read as one block.
const AVATAR_ACCENTS = [
  { bg: "bg-primary-tint", text: "text-primary" },
  { bg: "bg-violet-tint", text: "text-violet" },
  { bg: "bg-[#dff3fb]", text: "text-[#2a7fa8]" },
  { bg: "bg-primary-tint", text: "text-primary" },
] as const;

export function Team() {
  const t = useT();

  return (
    <section id="team" className="scroll-mt-24 border-y border-border bg-surface-2 py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight text-primary">{t.team.title}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t.team.intro}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-5 sm:grid-cols-2">
          {MEMBERS.map((m, i) => (
            <article
              key={m.name}
              className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-violet hover:bg-violet-tint/40"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-semibold ${AVATAR_ACCENTS[i % AVATAR_ACCENTS.length].bg} ${AVATAR_ACCENTS[i % AVATAR_ACCENTS.length].text}`}
                  aria-hidden="true"
                >
                  {m.name.charAt(0)}
                </span>
                <div className="flex flex-1 items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-foreground">{m.name}</h3>
                  <span className="shrink-0 font-mono text-xs text-muted">{m.location}</span>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-primary">{m.role}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{m.story}</p>

            <div className="mt-5 space-y-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {t.team.stackLabel}
                </span>
                {m.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {m.security && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {t.team.securityLabel}
                  </span>
                  {m.security.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-primary-dim/40 bg-primary-tint px-2 py-0.5 font-mono text-xs text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
