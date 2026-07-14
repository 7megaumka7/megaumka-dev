import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur-sm transition-colors hover:border-primary-dim hover:bg-surface"
    >
      <ProjectVisual project={project} />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.tagline}</p>
        </div>
        <span
          className="mt-1 shrink-0 rounded-full border px-2.5 py-1 text-xs"
          style={{ borderColor: project.accent, color: project.accent }}
        >
          {project.status === "shipped" ? "рабочий" : "концепт"}
        </span>
      </div>
    </Link>
  );
}
