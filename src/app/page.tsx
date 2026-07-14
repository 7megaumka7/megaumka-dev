import Link from "next/link";
import { BearLogo } from "@/components/BearLogo";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
        <div className="flex flex-col items-start gap-6">
          <BearLogo className="h-14 w-14 text-ice" />
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Строю сайты, которые ещё и выдержат аудит.
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Пентестер (OSCP, 3.5 года) и веб-разработчик. Ниже — рабочий
            проект и несколько концепт-кейсов: каждый честно помечен, где
            реальный код, а где витрина подхода.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-ice px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Смотреть проекты
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-ice-dim"
            >
              Написать
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-foreground">Проекты</h2>
          <Link href="/projects" className="text-sm text-muted hover:text-foreground">
            все проекты →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
