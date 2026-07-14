import Link from "next/link";
import { BearLogo } from "@/components/BearLogo";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-28 text-center">
      <BearLogo className="h-12 w-12 text-muted" />
      <h1 className="text-2xl font-semibold text-foreground">
        Такой страницы нет
      </h1>
      <p className="text-muted">Медведь тут не пробегал. Проверьте адрес.</p>
      <Link
        href="/"
        className="mt-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary-dim"
      >
        На главную
      </Link>
    </section>
  );
}
