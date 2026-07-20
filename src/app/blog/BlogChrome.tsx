import Link from "next/link";
import { BearLogo } from "@/components/BearLogo";

// The blog lives outside the one-page portfolio, so it carries its own minimal
// chrome instead of the section-scrolling FloatingNav (whose anchors don't exist here).
export function BlogChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-foreground transition-colors hover:text-primary">
            <BearLogo className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-tight">megaumka.dev</span>
          </Link>
          <Link href="/#contact" className="text-sm text-muted transition-colors hover:text-foreground">
            Обсудить проект
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-14">{children}</main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted">
        <Link href="/" className="underline hover:text-foreground">
          megaumka.dev
        </Link>{" "}
        - веб-разработка и security-first подход
      </footer>
    </div>
  );
}
