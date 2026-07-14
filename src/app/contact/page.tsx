import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Написать напрямую — по email.",
};

const CONTACT_EMAIL = "bbcec2010@gmail.com";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Контакты
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        Без формы обратной связи, которая никуда не отправляет письмо тайком
        — сейчас проще и честнее написать напрямую.
      </p>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        {CONTACT_EMAIL}
      </a>
    </section>
  );
}
