"use client";

import { useT } from "@/lib/i18n/I18nProvider";
import type { Project } from "@/lib/projects";

/**
 * Abstract, CSS-only "hero" visual per project - deliberately not a fake
 * screenshot. Concept case studies don't get a fabricated product photo;
 * they get an honest abstract mark themed to the project's accent color.
 */
export function ProjectVisual({ project }: { project: Project }) {
  const t = useT();
  const style = {
    "--accent": project.accent,
    "--accent-dim": project.accentDim,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-surface"
    >
      <div
        className="absolute -left-10 -top-16 h-56 w-56 rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--accent-dim)" }}
      />
      <PatternForProject slug={project.slug} />
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-1 font-mono text-xs text-muted backdrop-blur">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
        {project.status === "shipped" ? t.projects.statusShipped : t.projects.statusConcept}
      </div>
    </div>
  );
}

function PatternForProject({ slug }: { slug: string }) {
  switch (slug) {
    case "bonus-shop":
      return (
        <div className="absolute inset-0 grid grid-cols-4 gap-3 p-8 opacity-80">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface-2"
              style={{ aspectRatio: "1 / 1" }}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}
