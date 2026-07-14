import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Проекты",
  description: "Рабочие и концептуальные проекты — каждый честно помечен.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Проекты
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        «Рабочий» — реальный код в проде или staging. «Концепт» — придуманный
        кейс, который показывает подход к архитектуре и безопасности на
        конкретном сценарии, без готового рабочего продукта за ним.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
