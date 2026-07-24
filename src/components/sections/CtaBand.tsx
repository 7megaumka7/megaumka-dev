"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/lib/i18n/I18nProvider";
import { track } from "@/lib/track";

const CONTACT_EMAIL = "info@megaumka.dev";

// Full-bleed CTA band - the one pattern every strong agency site (local and
// international) shares: a loud, full-width break before the contact block.
// The only place on the page where the primary colour is used as a surface.
export function CtaBand() {
  return (
    <section aria-label="Обсудить проект" className="bg-primary">
      <Band />
    </section>
  );
}

function Band() {
  const t = useT();
  return (
    <Reveal className="mx-auto flex min-h-[50svh] max-w-5xl flex-col items-center justify-center gap-6 px-6 py-20 text-center">
      <h2 className="text-4xl font-bold tracking-tight text-background sm:text-6xl">{t.ctaBand.title}</h2>
      <p className="max-w-xl text-lg text-background/85">{t.ctaBand.subtitle}</p>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        onClick={() => track("email_click")}
        className="mt-2 rounded-lg bg-background px-8 py-4 text-base font-semibold text-primary transition duration-200 hover:scale-[1.03] hover:bg-violet-tint hover:text-violet active:scale-[0.97]"
      >
        {t.ctaBand.button}
      </a>
    </Reveal>
  );
}
