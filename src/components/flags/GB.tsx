"use client";

import { useId } from "react";

export function FlagGB({ className }: { className?: string }) {
  const clipId = useId();
  return (
    <svg viewBox="0 0 24 16" className={className} role="img" aria-label="English">
      <clipPath id={clipId}>
        <rect width="24" height="16" rx="2" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="16" fill="#012169" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.4" />
        <path d="M12 0 V16 M0 8 H24" stroke="#fff" strokeWidth="5.4" />
        <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="3" />
      </g>
    </svg>
  );
}
