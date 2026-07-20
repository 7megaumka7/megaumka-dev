"use client";

import { usePathname } from "next/navigation";
import { FloatingNav } from "./FloatingNav";
import { Footer } from "./Footer";

// Demo project pages (/demo/*) are meant to read as separate, real sites - not
// as sub-pages of the portfolio - so they skip the portfolio's own nav/footer chrome.
// The blog (/blog/*) carries its own minimal chrome for the same reason: the
// FloatingNav's section anchors don't exist outside the one-page portfolio.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const standalone = pathname?.startsWith("/demo") || pathname?.startsWith("/blog");

  if (standalone) {
    return <>{children}</>;
  }

  return (
    <div id="site-chrome-root" className="relative z-10 flex min-h-screen flex-col">
      <FloatingNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
