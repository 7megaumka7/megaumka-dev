"use client";

import { useId } from "react";

export function FlagRU({ className }: { className?: string }) {
  const clipId = useId();
  return (
    <svg viewBox="0 0 24 16" className={className} role="img" aria-label="Русский">
      <clipPath id={clipId}>
        <rect width="24" height="16" rx="2" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="16" fill="#fff" />
        <rect y="5.33" width="24" height="5.34" fill="#0039A6" />
        <rect y="10.67" width="24" height="5.33" fill="#D52B1E" />
      </g>
    </svg>
  );
}
