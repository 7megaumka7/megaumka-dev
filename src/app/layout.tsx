import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { Spotlight } from "@/components/motion/Spotlight";
import { ThemeProvider, themeAntiFlashScript } from "@/components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n/I18nProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "cyrillic"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://megaumka.dev";
const TITLE = "megaumka.dev: веб-разработка и security-first подход";
const DESCRIPTION =
  "Веб-студия из Астаны: полный цикл разработки сайтов с аудитом безопасности. Лендинги, каталоги, SaaS. Реальные проекты и живые demo на настоящем коде.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | megaumka.dev" },
  description: DESCRIPTION,
  keywords: [
    "заказать сайт",
    "разработка сайтов Астана",
    "создать сайт",
    "веб-разработка Казахстан",
    "аудит безопасности сайта",
    "пентест сайта",
    "Next.js разработка",
    "сайт с нуля",
  ],
  authors: [{ name: "megaumka.dev" }],
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "megaumka.dev",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ru_RU",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "megaumka.dev",
  url: SITE_URL,
  description: DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Астана", addressCountry: "KZ" },
  areaServed: ["KZ", "Almaty", "Astana"],
  knowsAbout: ["веб-разработка", "аудит безопасности", "пентест", "Next.js", "UI/UX дизайн"],
  email: "info@megaumka.dev",
  telephone: "+77772681549",
  sameAs: [] as string[],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="llms.txt" href="/llms.txt" />
        <script dangerouslySetInnerHTML={{ __html: themeAntiFlashScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <I18nProvider>
            <div className="bg-grid" />
            <Spotlight />
            <SiteChrome>{children}</SiteChrome>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
