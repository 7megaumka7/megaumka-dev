"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export function AnimatedHeadline({
  text,
  className,
  highlightWord,
}: {
  text: string;
  className?: string;
  highlightWord?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  function renderWord(w: string) {
    if (!highlightWord) return w;
    const stripped = w.replace(/[.,!?]+$/, "");
    if (stripped.toLowerCase() !== highlightWord.toLowerCase()) return w;
    const trail = w.slice(stripped.length);
    return (
      <>
        <span className="text-violet">{stripped}</span>
        {trail}
      </>
    );
  }

  if (reduce) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="show"
      variants={container}
      aria-label={text}
    >
      <span aria-hidden="true" className="contents">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span className="inline-block" variants={word}>
            {renderWord(w)}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
      </span>
    </motion.h1>
  );
}
