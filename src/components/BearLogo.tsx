type BearLogoProps = {
  className?: string;
  title?: string;
};

/**
 * Minimalist geometric polar bear mark - built from circles only, no external
 * asset/generation service. White fill reads on the dark Arctic theme; the
 * viewBox is square so it drops cleanly into favicons and nav slots.
 */
export function BearLogo({ className, title = "Umka" }: BearLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* ears */}
      <circle cx="16" cy="16" r="8" fill="currentColor" />
      <circle cx="48" cy="16" r="8" fill="currentColor" />
      {/* head */}
      <circle cx="32" cy="34" r="22" fill="currentColor" />
      {/* snout */}
      <circle cx="32" cy="40" r="10" fill="var(--color-background)" />
      {/* eyes */}
      <circle cx="24" cy="30" r="2.6" fill="var(--color-background)" />
      <circle cx="40" cy="30" r="2.6" fill="var(--color-background)" />
      {/* nose */}
      <ellipse cx="32" cy="38" rx="3.2" ry="2.4" fill="currentColor" />
    </svg>
  );
}
