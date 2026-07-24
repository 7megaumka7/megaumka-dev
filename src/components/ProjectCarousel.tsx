"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectVisual } from "./ProjectVisual";
import { useTheme } from "./ThemeProvider";
import { useT } from "@/lib/i18n/I18nProvider";
import type { Project } from "@/lib/projects";

// project.accent only clears 4.5:1 text contrast on dark surfaces; project.accentDim
// only clears it on light surfaces (verified against both theme surface colors) - so the
// status-badge text must swap between them per theme rather than using either color statically.
function useStatusColor(project: Project) {
  const { theme } = useTheme();
  return theme === "dark" ? project.accent : project.accentDim;
}

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const t = useT();
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pageBy = useCallback(
    (delta: number) => {
      setActiveIndex((cur) => (cur + delta + projects.length) % projects.length);
    },
    [projects.length],
  );

  const open = useCallback((index: number, el: HTMLElement) => {
    triggerRef.current = el;
    setOpenIndex(index);
  }, []);

  const close = useCallback(() => {
    // Must run before focus(): the trigger card lives under #site-chrome-root, which
    // ProjectOverlay marks inert while open - an inert element can't receive focus, and
    // the effect cleanup that normally lifts it won't run until after this callback returns.
    document.getElementById("site-chrome-root")?.removeAttribute("inert");
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((cur) => {
        if (cur === null) return cur;
        const next = (cur + delta + projects.length) % projects.length;
        setActiveIndex(next);
        return next;
      });
    },
    [projects.length],
  );

  const active = projects[activeIndex];

  return (
    <>
      {/* single-project pager - one project shown at a time, paged with edge arrows.
          The arrow buttons are unmounted (not just visually hidden) while the overlay is
          open: it's covered by the backdrop but stays in the DOM otherwise, so their labels
          ("Следующий проект" etc.) would collide with the overlay's own arrows for a11y
          tools and keep them tabbable underneath the modal. */}
      <div className="relative mx-auto max-w-4xl">
        {/* soft per-project accent halo behind the card - the one place the project's own
            brand color leaks into the portfolio's neutral palette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-2xl opacity-15 blur-2xl transition-colors duration-500"
          style={{ background: active.accent }}
        />
        {openIndex === null && (
          <>
            <button
              type="button"
              onClick={() => pageBy(-1)}
              aria-label={t.projects.prev}
              className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => pageBy(1)}
              aria-label={t.projects.next}
              className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105"
            >
              <ArrowIcon direction="right" />
            </button>
          </>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.button
            key={active.slug}
            type="button"
            onClick={(e) => open(activeIndex, e.currentTarget)}
            initial={reduce ? { opacity: 1 } : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="group block w-full rounded-xl border border-border bg-surface p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet hover:shadow-md active:scale-[0.99]"
          >
            <ProjectThumbnail project={active} />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-violet">
                  {active.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{active.tagline}</p>
              </div>
              <StatusBadge project={active} className="mt-1 shrink-0" />
            </div>
          </motion.button>
        </AnimatePresence>

        {openIndex === null && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="mr-2 font-mono text-xs tabular-nums text-muted">
              {activeIndex + 1} / {projects.length}
            </span>
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`${t.projects.goTo}: ${p.title}`}
                aria-current={i === activeIndex ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary-dim"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Portalled to <body>, outside #site-chrome-root, so the overlay can stay fully
          interactive/focusable while ProjectOverlay marks the rest of the page inert -
          without this, "inert" on an ancestor would also swallow the modal nested inside it. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {openIndex !== null && (
              <ProjectOverlay
                project={projects[openIndex]}
                onClose={close}
                onPrev={() => step(-1)}
                onNext={() => step(1)}
                reduce={!!reduce}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function ProjectOverlay({
  project,
  onClose,
  onPrev,
  onNext,
  reduce,
}: {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  reduce: boolean;
}) {
  const t = useT();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    setInfoOpen(false);
  }, [project.slug]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    // Hide the rest of the page from assistive tech and axe's contrast scan while the
    // modal is open - aria-modal alone doesn't remove background content from the
    // accessibility tree, so it stays reachable/inspectable behind the backdrop otherwise.
    const chromeRoot = document.getElementById("site-chrome-root");
    chromeRoot?.setAttribute("inert", "");

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // first Escape only dismisses the info panel - the screenshot stays open,
        // matching how the close (X) and info (i) toggle behave independently
        if (infoOpen) setInfoOpen(false);
        else onClose();
      } else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      chromeRoot?.removeAttribute("inert");
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext, infoOpen]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* nav arrows pinned to the viewport edges, outside the split panel */}
      <button
        type="button"
        onClick={onPrev}
        aria-label={t.projects.prev}
        className="fixed left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 sm:left-6"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={t.projects.next}
        className="fixed right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 sm:right-6"
      >
        <ArrowIcon direction="right" />
      </button>

      {/* single-pane panel: the screenshot is the whole point of zooming in, so it fills
          the entire dialog. All text detail lives behind the "i" toggle instead of taking
          up permanent space - it only appears when the visitor actually asks for it. */}
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-overlay-title"
        tabIndex={-1}
        key={project.slug}
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="relative mx-16 max-h-[90vh] w-[96vw] max-w-6xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        {/* aria-labelledby target - kept off-screen so it doesn't reintroduce the text
            the "i" toggle is meant to hide by default */}
        <h2 id="project-overlay-title" className="sr-only">
          {project.title}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label={t.projects.close}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/90 text-muted backdrop-blur transition-colors hover:border-primary-dim hover:text-foreground"
        >
          ✕
        </button>

        <button
          type="button"
          onClick={() => setInfoOpen((v) => !v)}
          aria-label={t.projects.info}
          aria-expanded={infoOpen}
          className="absolute left-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/90 font-serif text-sm font-semibold italic text-muted backdrop-blur transition-colors hover:border-primary-dim hover:text-foreground"
        >
          i
        </button>

        {project.demoHref && (
          <Link
            href={project.demoHref}
            className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-border bg-surface/90 px-4 py-2 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary-dim hover:text-primary"
          >
            {t.projects.openDemo} ↗
          </Link>
        )}

        <div className="flex max-h-[90vh] items-center justify-center bg-surface-2 p-6 sm:p-10">
          {project.images && project.images.length > 0 ? (
            <ScreenshotGallery images={project.images} title={project.title} />
          ) : (
            <ProjectVisual project={project} />
          )}
        </div>

        <AnimatePresence>
          {infoOpen && (
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              tabIndex={0}
              className="absolute inset-0 z-10 overflow-y-auto bg-surface/97 p-6 backdrop-blur outline-none sm:p-10"
            >
              <div className="flex flex-wrap items-center gap-3 pl-10 pr-8">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">{project.title}</h3>
                <StatusBadge project={project} />
                {project.demoHref && (
                  <Link href={project.demoHref} className="text-sm font-medium text-primary hover:underline">
                    {t.projects.openDemo} ↗
                  </Link>
                )}
              </div>
              <p className="mt-2 pl-10 text-muted">{project.tagline}</p>

              <dl className="mt-6 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">{t.projects.role}</dt>
                  <dd className="mt-1 text-foreground">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">{t.projects.stack}</dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-xs text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 space-y-6">
                <OverlaySection title={t.projects.problem}>{project.problem}</OverlaySection>
                <OverlaySection title={t.projects.solution}>{project.solution}</OverlaySection>
                {project.security ? (
                  <OverlaySection title={t.projects.security}>{project.security}</OverlaySection>
                ) : null}
                <OverlaySection title={t.projects.results}>{project.results}</OverlaySection>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Pager-card preview: real first screenshot (labeled) for shipped projects with captures,
// abstract ProjectVisual otherwise - so honesty is visible before the card is even opened.
function ProjectThumbnail({ project }: { project: Project }) {
  const t = useT();
  if (!project.images || project.images.length === 0) {
    return <ProjectVisual project={project} />;
  }
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border">
      <div className="absolute left-3 top-3 z-10 rounded-md border border-border bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-primary backdrop-blur">
        {t.projects.realProject}
      </div>
      <Image
        src={project.images[0]}
        alt={`${project.title}, превью`}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover object-top"
      />
    </div>
  );
}

// Browsable gallery of REAL screenshots for shipped projects - distinct from ProjectVisual's
// abstract placeholder used for concept cases, and explicitly labeled so it's never confused
// with a mockup (see the "honest labeling" premise stated in the hero copy).
function ScreenshotGallery({ images, title }: { images: string[]; title: string }) {
  const t = useT();
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  function step(delta: number) {
    setIndex((cur) => (cur + delta + images.length) % images.length);
  }

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-3 z-10 rounded-md border border-border bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-primary backdrop-blur">
        {t.projects.realShot}
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={images[index]}
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${title}, скриншот ${index + 1} из ${images.length}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t.projects.prevShot}
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform hover:scale-105"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t.projects.nextShot}
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform hover:scale-105"
            >
              <ArrowIcon direction="right" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${t.projects.goToShot} ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-primary-dim"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ project, className }: { project: Project; className?: string }) {
  const t = useT();
  const color = useStatusColor(project);
  return (
    <span
      className={`rounded-md border px-2.5 py-1 font-mono text-xs uppercase tracking-wide ${className ?? ""}`}
      style={{ borderColor: color, color }}
    >
      {project.status === "shipped" ? t.projects.statusShipped : t.projects.statusConcept}
    </span>
  );
}

function OverlaySection({ title, children }: { title: string; children: string }) {
  return (
    <section>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h3>
      <p className="mt-2 leading-relaxed text-foreground">{children}</p>
    </section>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}
