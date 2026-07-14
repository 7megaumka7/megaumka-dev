import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
