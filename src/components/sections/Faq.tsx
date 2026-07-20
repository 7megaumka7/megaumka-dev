"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";

const ITEMS = [
  {
    q: "Сколько стоит сайт и от чего зависит цена?",
    a: "Смотрите раздел «Тарифы» выше: цены стартуют от 250 000 ₸ за лендинг и доходят до 1 500 000 ₸ и выше за проект со сложной бизнес-логикой. Итоговая цена зависит от количества разделов, интеграций и того, нужна ли авторизация с ролями.",
  },
  {
    q: "Какие сроки разработки?",
    a: "Лендинг делаем около недели, стандартный сайт с каталогом занимает 2–4 недели, а сложный проект с бэкендом от 4 недель. Точный срок фиксируем до старта, после согласования объема.",
  },
  {
    q: "Безопасность действительно не «доп. опция»?",
    a: "Нет. Проверка прав доступа на уровне базы данных, а не только в роутинге, запрет прямой раздачи приватных файлов, защита форм от спама и rate-limit входят в стандартную сдачу проекта, а не идут отдельной строкой в смете.",
  },
  {
    q: "Работаете с существующими сайтами или только с нуля?",
    a: "И то, и другое. Улучшение дизайна и функционала существующего сайта тоже отдельная услуга, подробности в разделе «Тарифы» выше: аудит, точечный редизайн, добавление недостающей функциональности без переписывания всего проекта.",
  },
  {
    q: "Как проходит оплата?",
    a: "Предоплата на старте, обычно 30–50%, а остаток вносится по сдаче или по согласованным этапам для больших проектов. Условия фиксируются до начала работы.",
  },
  {
    q: "У вас нет логотипов известных брендов и отзывов. Почему вам верить?",
    a: "Потому что мы показываем не логотипы, а работающий код: каждый проект в портфолио открывается и кликается прямо с этого сайта, скриншоты сняты с живых страниц. Плюс цена фиксируется в договоре до старта, а после security-ревью вы получаете письменный отчет. Логотипы появятся, а проверяемость останется как есть.",
  },
  {
    q: "Есть ли поддержка после сдачи?",
    a: "Да, на тарифе «Про» поддержка после сдачи включена. Для остальных тарифов она обсуждается отдельно: от разовых правок до регулярного сопровождения.",
  },
];

export function Faq() {
  const t = useT();
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-primary">{t.faq.title}</h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
        {ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-violet-tint"
              >
                <span className="font-medium text-foreground">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.2 }}
                  className="shrink-0 text-xl leading-none text-muted"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
