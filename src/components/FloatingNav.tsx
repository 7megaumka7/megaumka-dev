"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BearLogo } from "./BearLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useT } from "@/lib/i18n/I18nProvider";

const SECTION_IDS = ["hero", "projects", "services", "faq", "team", "about", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export function FloatingNav() {
  const t = useT();
  const [active, setActive] = useState<SectionId>("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  function goTo(id: SectionId) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const links: { id: SectionId; label: string }[] = [
    { id: "projects", label: t.nav.projects },
    { id: "services", label: t.nav.services },
    { id: "faq", label: t.nav.faq },
    { id: "team", label: t.nav.team },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div className="flex w-full max-w-4xl items-center gap-2 rounded-full border border-border/80 bg-background/85 px-3 py-2 shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={() => goTo("hero")}
          className="flex shrink-0 items-center gap-2 rounded-full px-2 py-1 text-foreground transition-colors hover:text-primary"
          aria-label="megaumka.dev"
        >
          <BearLogo className="h-6 w-6" />
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">megaumka.dev</span>
        </button>

        {/* Section shortcuts hidden below lg: with seven items (incl. the Blog link) the
            row overflows a tablet-width pill and pushes the theme toggle off-screen.
            The page is a single continuous scroll, so section links are a shortcut, not the only way in. */}
        <nav className="hidden flex-1 items-center justify-center gap-1 text-sm text-muted lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => goTo(l.id)}
              aria-current={active === l.id ? "true" : undefined}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                active === l.id
                  ? "bg-primary-tint text-primary"
                  : "hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
          {/* the blog is a separate page, not a scroll target - a real link, styled
              like its sibling section buttons with the site-wide pink hover */}
          <Link
            href="/blog"
            className="rounded-full px-3 py-1.5 transition-colors duration-200 hover:bg-violet-tint hover:text-violet"
          >
            {t.nav.blog}
          </Link>
        </nav>
        <div className="flex-1 lg:hidden" />


        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
