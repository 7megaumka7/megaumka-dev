import Link from "next/link";
import { BearLogo } from "./BearLogo";

const links = [
  { href: "/projects", label: "Проекты" },
  { href: "/about", label: "Обо мне" },
  { href: "/contact", label: "Контакты" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-foreground transition-colors hover:text-ice"
        >
          <BearLogo className="h-8 w-8 text-foreground" />
          <span className="text-lg font-semibold tracking-tight">umka.dev</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
