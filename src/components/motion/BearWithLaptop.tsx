"use client";

import { useEffect, useRef } from "react";

// Flat-vector bear (storyset/undraw style, no black outlines), now gently alive:
// - pupils blink once a second (scaleY squash, CSS keyframes),
// - pupils track the cursor (rAF-throttled mousemove, direct style writes - no re-renders),
// - the sparkle stars spin while the illustration is hovered.
// Still exposed as a single decorative image (role="img"), not a control.
export function BearWithLaptop({ className }: { className?: string }) {
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
        const cy = rect.top + rect.height * 0.34; // eye line, not svg centre
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const len = Math.hypot(dx, dy) || 1;
        // pupils travel at most ~3.5 units inside the lenses
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
      viewBox="0 0 320 360"
      className={className}
      role="img"
      aria-label="Иллюстрация: веселый медведь в очках стоит с ноутбуком, экран которого повернут к нему"
    >
      <style>{`
        @keyframes bear-blink {
          0%, 88% { transform: scaleY(1); }
          93% { transform: scaleY(0.08); }
          98%, 100% { transform: scaleY(1); }
        }
        .bear-pupil {
          transform-box: fill-box;
          transform-origin: center;
          animation: bear-blink 1s infinite;
        }
        @keyframes bear-star-spin {
          to { transform: rotate(360deg); }
        }
        svg:hover .bear-star {
          transform-box: fill-box;
          transform-origin: center;
          animation: bear-star-spin 2.2s linear infinite;
        }
      `}</style>

      {/* soft accent blob behind the figure - sized to reach past the feet/shadow, not just
          the head+torso, so dark shapes (shoes, shadow) always sit on this light backdrop
          instead of bleeding onto the page's own background in dark theme */}
      <ellipse cx="168" cy="195" rx="150" ry="175" fill="#E3ECDD" opacity="0.6" />

      {/* ground shadow */}
      <ellipse cx="160" cy="345" rx="86" ry="12" fill="#1a1c1b" opacity="0.16" />

      {/* sparkle accents - spin on hover */}
      <path className="bear-star" d="M56 96 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5 Z" fill="#6ec9f2" opacity="0.85" />
      <path className="bear-star" d="M258 150 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4 Z" fill="#78555d" opacity="0.7" />
      <path className="bear-star" d="M240 66 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill="#c98a4b" opacity="0.8" />

      {/* legs - start above the sweater hem so there's no gap at the join */}
      <path d="M126 288 q-6 42 -2 52 q10 6 20 0 q4 -32 6 -52 Z" fill="#31352c" />
      <path d="M186 288 q6 42 2 52 q-10 6 -20 0 q-4 -32 -6 -52 Z" fill="#31352c" />
      <ellipse cx="128" cy="341" rx="17" ry="8" fill="#1a1c1b" />
      <ellipse cx="188" cy="341" rx="17" ry="8" fill="#1a1c1b" />

      {/* torso - sweater with a subtle darker fold on one side for depth, no outline */}
      <path
        d="M112 190 Q110 160 156 156 Q202 160 200 190 L206 300 Q160 316 106 300 Z"
        fill="#49663f"
      />
      <path
        d="M118 195 Q114 220 118 260 Q122 285 132 302 Q120 300 106 296 L112 195 Z"
        fill="#395530"
        opacity="0.45"
      />
      <path d="M140 176 Q156 168 172 176 L168 196 Q156 202 144 196 Z" fill="#F2E9DA" />

      {/* arms, bent up holding the laptop from behind */}
      <path d="M112 196 Q78 206 70 240 Q68 258 82 262 Q92 248 96 228 Q104 210 122 202 Z" fill="#49663f" />
      <path d="M200 196 Q234 206 242 240 Q244 258 230 262 Q220 248 216 228 Q208 210 190 202 Z" fill="#49663f" />

      {/* laptop, screen turned away from the viewer toward the bear */}
      <path d="M96 258 L224 258 L232 276 L88 276 Z" fill="#dfe1db" />
      <rect x="118" y="264" width="84" height="4" rx="2" fill="#a9ada3" />
      <path
        d="M92 172 Q160 156 228 172 L226 258 Q160 246 94 258 Z"
        fill="#31352c"
      />
      <path
        d="M92 172 Q160 156 228 172 L226 190 Q160 174 94 190 Z"
        fill="#1a1c1b"
        opacity="0.35"
      />
      <circle cx="160" cy="216" r="9" fill="#49663f" opacity="0.9" />

      {/* paws gripping the laptop's outer edges - drawn after the lid so they read as holding it */}
      <ellipse cx="78" cy="256" rx="16" ry="13" fill="#e8c9a0" />
      <ellipse cx="234" cy="256" rx="16" ry="13" fill="#e8c9a0" />

      {/* soft glow cast from the screen onto the bear's face */}
      <ellipse cx="160" cy="150" rx="58" ry="34" fill="#A8C99A" opacity="0.18" />

      {/* head */}
      <circle cx="122" cy="80" r="26" fill="#EFE3D0" />
      <circle cx="198" cy="80" r="26" fill="#EFE3D0" />
      <circle cx="122" cy="82" r="13" fill="#F4C6D0" opacity="0.9" />
      <circle cx="198" cy="82" r="13" fill="#F4C6D0" opacity="0.9" />
      <circle cx="160" cy="128" r="72" fill="#FBF3E7" />
      <path d="M96 128 Q92 168 130 190 Q160 202 190 190 Q228 168 224 128 Q224 90 160 84 Q96 90 96 128 Z" fill="#F2E9DA" opacity="0.5" />

      {/* muzzle */}
      <ellipse cx="160" cy="150" rx="34" ry="26" fill="#FFFDF9" />
      <ellipse cx="160" cy="140" rx="6.5" ry="5" fill="#1a1c1b" />
      <path d="M160 145 Q150 162 138 156 M160 145 Q170 162 182 156" fill="none" stroke="#1a1c1b" strokeWidth="2.5" strokeLinecap="round" />

      {/* glasses - thin rims, no heavy outline */}
      <circle cx="136" cy="122" r="19" fill="#dff3fb" opacity="0.5" stroke="#31352c" strokeWidth="3" />
      <circle cx="184" cy="122" r="19" fill="#dff3fb" opacity="0.5" stroke="#31352c" strokeWidth="3" />
      <path d="M155 122 Q160 118 165 122" fill="none" stroke="#31352c" strokeWidth="3" strokeLinecap="round" />
      <path d="M117 118 L104 112" stroke="#31352c" strokeWidth="3" strokeLinecap="round" />
      <path d="M203 118 L216 112" stroke="#31352c" strokeWidth="3" strokeLinecap="round" />

      {/* pupils - cursor tracking (group) + per-pupil blink squash */}
      <g ref={eyesRef}>
        <circle className="bear-pupil" cx="136" cy="122" r="5" fill="#1a1c1b" />
        <circle className="bear-pupil" cx="184" cy="122" r="5" fill="#1a1c1b" />
      </g>

      {/* cheer: raised eyebrows for a bright, happy expression */}
      <path d="M124 100 Q136 94 146 100" fill="none" stroke="#1a1c1b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M174 100 Q184 94 196 100" fill="none" stroke="#1a1c1b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
