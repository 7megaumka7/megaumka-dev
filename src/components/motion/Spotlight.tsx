"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Cursor-tracked radial glow, fixed behind content. Plain CSS-var + rAF-throttled
 * pointermove - no spring physics needed for a soft background blob, keeps it cheap.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let x = 50;
    let y = 20;

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      x = (e.clientX / window.innerWidth) * 100;
      y = (e.clientY / window.innerHeight) * 100;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          ref.current?.style.setProperty("--x", `${x}%`);
          ref.current?.style.setProperty("--y", `${y}%`);
          raf = 0;
        });
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 15%), rgba(73,102,63,0.08), transparent 60%)",
      }}
    />
  );
}
