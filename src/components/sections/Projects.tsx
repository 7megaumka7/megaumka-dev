"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { useT } from "@/lib/i18n/I18nProvider";
import { projects } from "@/lib/projects";

export function Projects() {
  const t = useT();

  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-primary">
          {t.projects.title}
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{t.projects.intro}</p>
      </Reveal>

      <div className="mt-10">
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
