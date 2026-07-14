import { BearLogo } from "./BearLogo";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BearLogo className="h-5 w-5 text-muted" />
          <span>umka.dev — веб-разработка и security-first подход</span>
        </div>
        <span>© {new Date().getFullYear()}. Все проекты описаны честно: рабочие или концептуальные.</span>
      </div>
    </footer>
  );
}
