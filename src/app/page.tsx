import Link from "next/link";
import { AnimatedBear } from "@/components/motion/AnimatedBear";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-24 text-center sm:pt-32">
        <div className="flex flex-col items-center gap-6">
          <AnimatedBear className="h-12 w-12" />

          <Reveal className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            OSCP · security-first разработка
          </Reveal>

          <AnimatedHeadline
            text="Строю сайты, которые ещё и выдержат аудит."
            className="text-gradient max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl"
          />

          <Reveal delay={0.55}>
            <p className="max-w-xl text-lg text-muted">
              Пентестер (3.5 года) и веб-разработчик. Ниже — рабочий проект и
              несколько концепт-кейсов: каждый честно помечен, где реальный
              код, а где витрина подхода.
            </p>
          </Reveal>

          <Reveal delay={0.7} className="flex flex-wrap justify-center gap-3">
            <Magnetic>
              <Link
                href="/projects"
                className="inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-background shadow-[0_8px_24px_-8px_var(--color-primary)] transition-opacity hover:opacity-90"
              >
                Смотреть проекты
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/contact"
                className="inline-block rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary-dim"
              >
                Написать
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-28">
        <Reveal className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-foreground">Проекты</h2>
          <Link href="/projects" className="text-sm text-muted hover:text-foreground">
            все проекты →
          </Link>
        </Reveal>
        <StaggerGrid className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <StaggerItem key={p.slug}>
              <Magnetic strength={0.06}>
                <ProjectCard project={p} />
              </Magnetic>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
    </>
  );
}
