import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Spotlight } from "@/components/motion/Spotlight";

export const metadata: Metadata = {
  metadataBase: new URL("https://umka.dev"),
  title: {
    default: "umka.dev — веб-разработка и security-first подход",
    template: "%s — umka.dev",
  },
  description:
    "Портфолио: пентестер (OSCP) и веб-разработчик. Проекты — от рабочего e-commerce до концептов с разбором безопасности.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        <div className="bg-grid" />
        <Spotlight />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
