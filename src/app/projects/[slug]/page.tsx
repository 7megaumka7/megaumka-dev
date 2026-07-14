import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/projects" className="text-sm text-muted hover:text-foreground">
        ← все проекты
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {project.title}
          </h1>
          <span
            className="rounded-full border px-2.5 py-1 text-xs"
            style={{ borderColor: project.accent, color: project.accent }}
          >
            {project.status === "shipped" ? "рабочий проект" : "концепт-кейс"}
          </span>
        </div>
        <p className="mt-2 text-lg text-muted">{project.tagline}</p>
      </header>

      <div className="mt-8">
        <ProjectVisual project={project} />
      </div>

      <dl className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted">Роль</dt>
          <dd className="mt-1 text-foreground">{project.role}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted">Стек</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-surface px-2 py-0.5 text-xs text-muted"
              >
                {s}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <div className="mt-8 space-y-8">
        <Section title="Задача">{project.problem}</Section>
        <Section title="Решение">{project.solution}</Section>
        {project.security ? (
          <Section title="Безопасность">{project.security}</Section>
        ) : null}
        <Section title="Результат">{project.results}</Section>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
        {title}
      </h2>
      <p className="mt-2 leading-relaxed text-foreground">{children}</p>
    </section>
  );
}
