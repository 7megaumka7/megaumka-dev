"use client";

import { useEffect, useRef } from "react";

// Same construction and craft level as BearWithLaptop (soft blob backdrop,
// ground shadow, sparkle accents, torso fold shading, blinking/tracking eyes)
// - just holding a shield instead of a laptop, for the About section's
// origin story ("started with a pentest"). Matches that component's hardcoded
// palette 1:1 rather than the flatter CSS-var version this replaces, so the
// two bears read as the same character drawn by the same hand.
export function BearAudit({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const eyes = eyesRef.current;
    if (!svg || !eyes) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    function onMove(e: MouseEvent) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = svg!.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.34;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const len = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, len / 220) * 3.5;
        eyes!.style.transform = `translate(${((dx / len) * k).toFixed(2)}px, ${((dy / len) * k).toFixed(2)}px)`;
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 340"
      className={className}
      role="img"
      aria-label="Иллюстрация: медведь-пентестер держит щит с галочкой"
    >
      <style>{`
        @keyframes bear-audit-blink {
          0%, 88% { transform: scaleY(1); }
          93% { transform: scaleY(0.08); }
          98%, 100% { transform: scaleY(1); }
        }
        .bear-audit-pupil {
          transform-box: fill-box;
          transform-origin: center;
          animation: bear-audit-blink 1.1s infinite;
        }
        @keyframes bear-audit-star-spin {
          to { transform: rotate(360deg); }
        }
        svg:hover .bear-audit-star {
          transform-box: fill-box;
          transform-origin: center;
          animation: bear-audit-star-spin 2.2s linear infinite;
        }
      `}</style>

      {/* soft accent blob, same treatment as BearWithLaptop */}
      <ellipse cx="160" cy="175" rx="148" ry="172" fill="#E3ECDD" opacity="0.6" />

      {/* ground shadow */}
      <ellipse cx="158" cy="322" rx="82" ry="12" fill="#1a1c1b" opacity="0.16" />

      {/* sparkle accents */}
      <path className="bear-audit-star" d="M52 100 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5 Z" fill="#6ec9f2" opacity="0.85" />
      <path className="bear-audit-star" d="M256 158 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4 Z" fill="#78555d" opacity="0.7" />
      <path className="bear-audit-star" d="M238 76 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill="#c98a4b" opacity="0.8" />

      {/* legs */}
      <path d="M124 264 q-6 40 -2 50 q10 6 20 0 q4 -30 6 -50 Z" fill="#31352c" />
      <path d="M184 264 q6 40 2 50 q-10 6 -20 0 q-4 -30 -6 -50 Z" fill="#31352c" />
      <ellipse cx="126" cy="316" rx="17" ry="8" fill="#1a1c1b" />
      <ellipse cx="186" cy="316" rx="17" ry="8" fill="#1a1c1b" />

      {/* torso - sweater with fold shading, same treatment as BearWithLaptop */}
      <path d="M110 166 Q108 136 154 132 Q200 136 198 166 L204 274 Q158 290 104 274 Z" fill="#49663f" />
      <path
        d="M116 170 Q112 195 116 234 Q120 258 130 275 Q118 273 104 269 L110 170 Z"
        fill="#395530"
        opacity="0.45"
      />
      <path d="M138 152 Q154 144 170 152 L166 172 Q154 178 142 172 Z" fill="#F2E9DA" />

      {/* arms, bent up holding the shield from behind */}
      <path d="M110 172 Q78 184 70 216 Q68 234 82 238 Q92 224 96 206 Q104 188 122 178 Z" fill="#49663f" />
      <path d="M198 172 Q230 184 238 216 Q240 234 226 238 Q216 224 212 206 Q204 188 186 178 Z" fill="#49663f" />

      {/* shield, held centred at chest height */}
      <path
        d="M158 176 L204 192 Q204 240 158 264 Q112 240 112 192 Z"
        fill="#f4e3e6"
        stroke="#78555d"
        strokeWidth="3"
      />
      <path d="M136 216 l16 16 30 -34" fill="none" stroke="#395530" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

      {/* paws gripping the shield's outer edges */}
      <ellipse cx="76" cy="232" rx="16" ry="13" fill="#e8c9a0" />
      <ellipse cx="232" cy="232" rx="16" ry="13" fill="#e8c9a0" />

      {/* soft glow cast onto the bear's face */}
      <ellipse cx="158" cy="126" rx="58" ry="34" fill="#A8C99A" opacity="0.18" />

      {/* head */}
      <circle cx="120" cy="56" r="26" fill="#EFE3D0" />
      <circle cx="196" cy="56" r="26" fill="#EFE3D0" />
      <circle cx="120" cy="58" r="13" fill="#F4C6D0" opacity="0.9" />
      <circle cx="196" cy="58" r="13" fill="#F4C6D0" opacity="0.9" />
      <circle cx="158" cy="104" r="72" fill="#FBF3E7" />
      <path d="M94 104 Q90 144 128 166 Q158 178 188 166 Q226 144 222 104 Q222 66 158 60 Q94 66 94 104 Z" fill="#F2E9DA" opacity="0.5" />

      {/* muzzle */}
      <ellipse cx="158" cy="126" rx="34" ry="26" fill="#FFFDF9" />
      <ellipse cx="158" cy="116" rx="6.5" ry="5" fill="#1a1c1b" />
      <path d="M158 121 Q148 138 136 132 M158 121 Q168 138 180 132" fill="none" stroke="#1a1c1b" strokeWidth="2.5" strokeLinecap="round" />

      {/* glasses */}
      <circle cx="134" cy="98" r="19" fill="#dff3fb" opacity="0.5" stroke="#31352c" strokeWidth="3" />
      <circle cx="182" cy="98" r="19" fill="#dff3fb" opacity="0.5" stroke="#31352c" strokeWidth="3" />
      <path d="M153 98 Q158 94 163 98" fill="none" stroke="#31352c" strokeWidth="3" strokeLinecap="round" />
      <path d="M115 94 L102 88" stroke="#31352c" strokeWidth="3" strokeLinecap="round" />
      <path d="M201 94 L214 88" stroke="#31352c" strokeWidth="3" strokeLinecap="round" />

      {/* pupils - cursor tracking + blink */}
      <g ref={eyesRef}>
        <circle className="bear-audit-pupil" cx="134" cy="98" r="5" fill="#1a1c1b" />
        <circle className="bear-audit-pupil" cx="182" cy="98" r="5" fill="#1a1c1b" />
      </g>

      {/* eyebrows */}
      <path d="M122 76 Q134 70 144 76" fill="none" stroke="#1a1c1b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M172 76 Q182 70 194 76" fill="none" stroke="#1a1c1b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
