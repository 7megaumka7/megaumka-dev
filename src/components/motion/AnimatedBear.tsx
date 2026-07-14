"use client";

import { motion, useReducedMotion } from "motion/react";
import { BearLogo } from "@/components/BearLogo";

export function AnimatedBear({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: reduce ? 0 : [0, -6, 0],
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        y: reduce
          ? undefined
          : { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
      }}
    >
      <BearLogo className="h-full w-full text-primary" />
    </motion.div>
  );
}
