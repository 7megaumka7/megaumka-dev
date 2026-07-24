import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";
import { BlogChrome } from "../BlogChrome";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <BlogChrome>
      <Link href="/blog" className="text-sm text-muted transition-colors hover:text-foreground">
        ← Все заметки
      </Link>
      <article className="mt-6">
        <time dateTime={post.date} className="font-mono text-xs text-muted">
          {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
        </time>
        <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-foreground">
          {post.title}
        </h1>
        <div className="mt-8 space-y-5 leading-relaxed text-foreground/90">
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
      <div className="mt-12 rounded-xl border border-border bg-surface p-6">
        <p className="font-semibold text-foreground">Есть похожая задача?</p>
        <p className="mt-1 text-sm text-muted">Напишите пару строк - оценим объем и сроки бесплатно.</p>
        <Link
          href="/#contact"
          className="mt-4 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Обсудить проект
        </Link>
      </div>
    </BlogChrome>
  );
}
