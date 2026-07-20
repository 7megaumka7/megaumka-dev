"use client";

import { useId } from "react";

export function FlagKZ({ className }: { className?: string }) {
  const clipId = useId();
  const sunId = useId();
  return (
    <svg viewBox="0 0 24 16" className={className} role="img" aria-label="Қазақша">
      <clipPath id={clipId}>
        <rect width="24" height="16" rx="2" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="16" fill="#00AFCA" />
        <g id={sunId} fill="#FEC50C">
          <circle cx="9" cy="8" r="3.2" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const x1 = 9 + Math.cos(angle) * 3.8;
            const y1 = 8 + Math.sin(angle) * 3.8;
            const x2 = 9 + Math.cos(angle) * 5.2;
            const y2 = 8 + Math.sin(angle) * 5.2;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#FEC50C"
                strokeWidth="0.7"
                strokeLinecap="round"
              />
            );
          })}
        </g>
        <path d="M17 3.5 L17.6 5 L19.2 5 L17.9 6 L18.4 7.5 L17 6.6 L15.6 7.5 L16.1 6 L14.8 5 L16.4 5 Z" fill="#FEC50C" />
      </g>
    </svg>
  );
}
