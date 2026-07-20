import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { BlogChrome } from "./BlogChrome";

export const metadata: Metadata = {
  title: "Блог",
  description: "Заметки студии megaumka.dev о безопасности сайтов, оценке проектов и разработке.",
};

export default function BlogIndexPage() {
  return (
    <BlogChrome>
      <h1 className="text-3xl font-semibold tracking-tight text-primary">Блог</h1>
      <p className="mt-3 max-w-xl text-muted">
        Заметки из практики: что мы находим на аудитах и как ведем проекты. Без
        пересказов чужих новостей.
      </p>

      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="rounded-xl border border-border bg-surface p-6">
            <time dateTime={post.date} className="font-mono text-xs text-muted">
              {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-primary">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Читать →
            </Link>
          </li>
        ))}
      </ul>
    </BlogChrome>
  );
}
