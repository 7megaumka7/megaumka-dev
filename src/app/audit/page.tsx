import type { Metadata } from "next";
import Link from "next/link";
import { BearLogo } from "@/components/BearLogo";
import { AuditTool } from "./AuditTool";

export const metadata: Metadata = {
  title: "Бесплатный аудит сайта",
  description:
    "Бесплатная автоматическая проверка сайта за 10 секунд: HTTPS, security-заголовки, мобильная адаптация, базовое SEO. Без регистрации.",
};

export default function AuditPage() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-foreground transition-colors hover:text-primary">
            <BearLogo className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-tight">megaumka.dev</span>
          </Link>
          <Link href="/#contact" className="text-sm text-muted transition-colors hover:text-foreground">
            Обсудить проект
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-primary">Бесплатный аудит сайта</h1>
        <p className="mt-3 text-muted">
          Вставьте адрес - за несколько секунд проверим HTTPS, security-заголовки, мобильную адаптацию
          и базовое SEO. Без регистрации, без сохранения адреса.
        </p>

        <div className="mt-8">
          <AuditTool />
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted">
        <Link href="/" className="underline hover:text-foreground">
          megaumka.dev
        </Link>{" "}
        - веб-разработка и security-first подход
      </footer>
    </div>
  );
}
