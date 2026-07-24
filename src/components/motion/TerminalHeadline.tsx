"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const CHAR_MS = 32;

/**
 * Kali-terminal-style typing effect - a fake prompt line precedes the text,
 * which types out character by character with a blinking block cursor. Used
 * for the hero headline (as="h1") and for secondary in-terminal command
 * lines like "open ./bear.jpg" (as="p") - only one <h1> per page.
 */
export function TerminalHeadline({
  text,
  className,
  highlightWord,
  prompt = "root@megaumka:~$",
  promptColor,
  highlightColor,
  startDelayMs = 0,
  as = "h1",
  onDone,
}: {
  text: string;
  className?: string;
  highlightWord?: string;
  prompt?: string;
  /** Overrides the prompt line's colour - needed on a hardcoded-dark host
   * section, since the default text-muted class resolves to the *theme's*
   * muted colour and stays light-mode-dark regardless of the section's own
   * background, failing contrast against it. */
  promptColor?: string;
  /** Same idea as promptColor, for the highlighted word (default text-violet
   * class is theme-dependent too). */
  highlightColor?: string;
  startDelayMs?: number;
  as?: "h1" | "p";
  onDone?: () => void;
}) {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(reduce ? text.length : 0);
  const [started, setStarted] = useState(!!reduce);
  const [done, setDone] = useState(!!reduce);

  // No "already started" ref-guard here on purpose: React 18 Strict Mode
  // (dev only) runs this effect, its cleanup, then the effect again on
  // every mount. A guard that survives the cleanup would see the second
  // run as "already started" and skip scheduling entirely - typing would
  // never begin. Cleanup already cancels the pending timers correctly, so
  // letting the effect run again from a clean slate is the correct fix.
  useEffect(() => {
    setRevealed(reduce ? text.length : 0);
    setStarted(!!reduce);
    setDone(!!reduce);

    if (reduce) {
      onDone?.();
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      setStarted(true);
      let i = 0;
      intervalId = setInterval(() => {
        i += 1;
        setRevealed(i);
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
          onDone?.();
        }
      }, CHAR_MS);
    }, startDelayMs);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, text, startDelayMs]);

  const shown = text.slice(0, revealed);
  const highlightStart = highlightWord ? text.toLowerCase().indexOf(highlightWord.toLowerCase()) : -1;
  const highlightEnd = highlightStart >= 0 ? highlightStart + (highlightWord?.length ?? 0) : -1;

  function renderShown() {
    if (highlightStart < 0) return shown;
    const before = shown.slice(0, Math.min(shown.length, highlightStart));
    const mid = shown.slice(Math.min(shown.length, highlightStart), Math.min(shown.length, highlightEnd));
    const after = shown.slice(Math.min(shown.length, highlightEnd));
    return (
      <>
        {before}
        {mid && (
          <span className={highlightColor ? "" : "text-violet"} style={highlightColor ? { color: highlightColor } : undefined}>
            {mid}
          </span>
        )}
        {after}
      </>
    );
  }

  const Tag = as;
  // aria-label is only valid on elements whose role supports accessible
  // naming (headings, etc.) - a plain <p> doesn't, so the "p" variant gets
  // a visually-hidden text node with the full string instead, and the
  // animated visual reveal is aria-hidden.
  const labelProps = as === "h1" ? { "aria-label": text } : {};

  return (
    <Tag className={className} {...labelProps}>
      {as === "p" && <span className="sr-only">{text}</span>}
      <span aria-hidden="true">
        <span
          className={`mb-2 block font-terminal text-xs font-normal normal-case tracking-normal sm:text-sm ${promptColor ? "" : "text-muted"}`}
          style={promptColor ? { color: promptColor } : undefined}
        >
          {prompt}
        </span>
        <span className="font-terminal">
          {renderShown()}
          {(started || reduce) && (
            <span
              className={`terminal-cursor inline-block h-[0.85em] w-[0.5ch] translate-y-[0.08em] bg-primary align-middle ${
                done ? "terminal-cursor-blink" : ""
              }`}
            />
          )}
        </span>
      </span>
      <style>{`
        @keyframes terminal-cursor-blink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        .terminal-cursor-blink { animation: terminal-cursor-blink 1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          .terminal-cursor-blink { animation: none; opacity: 1; }
        }
      `}</style>
    </Tag>
  );
}
