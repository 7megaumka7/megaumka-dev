"use client";

import { BearLogo } from "@/components/BearLogo";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  // Deliberately no error.message / stack rendered here — see docs/SECURITY.md
  // (A10, error leakage) in the sibling ai-studio repo for the reasoning.
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-28 text-center">
      <BearLogo className="h-12 w-12 text-danger" />
      <h1 className="text-2xl font-semibold text-foreground">
        Что-то пошло не так
      </h1>
      <p className="text-muted">Уже разбираюсь. Попробуйте ещё раз.</p>
      <button
        onClick={() => reset()}
        className="mt-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary-dim"
      >
        Попробовать снова
      </button>
    </section>
  );
}
