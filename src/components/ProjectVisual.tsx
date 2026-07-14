import type { Project } from "@/lib/projects";

/**
 * Abstract, CSS-only "hero" visual per project — deliberately not a fake
 * screenshot. Concept case studies don't get a fabricated product photo;
 * they get an honest abstract mark themed to the project's accent color.
 */
export function ProjectVisual({ project }: { project: Project }) {
  const style = {
    "--accent": project.accent,
    "--accent-dim": project.accentDim,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div
        className="absolute -left-10 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--accent)" }}
      />
      <div
        className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--accent-dim)" }}
      />
      <PatternForProject slug={project.slug} />
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted backdrop-blur">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
        {project.status === "shipped" ? "рабочий проект" : "концепт-кейс"}
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
    case "whiskr":
      return (
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-80">
          {[36, 56, 44, 64, 32].map((size, i) => (
            <div
              key={i}
              className="rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: "var(--accent)",
                background: i % 2 === 0 ? "var(--accent)" : "transparent",
                opacity: i % 2 === 0 ? 0.5 : 1,
              }}
            />
          ))}
        </div>
      );
    case "nomad-legal":
      return (
        <div className="absolute inset-0 flex flex-col justify-center gap-3 px-10 opacity-90">
          {[80, 60, 70, 40].map((w, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full"
              style={{
                width: `${w}%`,
                background: i === 0 ? "var(--accent)" : "var(--color-border)",
              }}
            />
          ))}
        </div>
      );
    case "pulseboard":
      return (
        <div className="absolute inset-0 flex items-end gap-2 p-10 opacity-90">
          {[30, 55, 40, 70, 50, 85, 60].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md"
              style={{
                height: `${h}%`,
                background: i % 2 === 0 ? "var(--accent)" : "var(--accent-dim)",
              }}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}
