import type { CSSProperties } from "react";

export function Coral({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 80" className={className} style={style} role="presentation">
      <path
        d="M50 80 V44 M50 52 L30 32 M50 56 L72 34 M30 32 V18 M72 34 V20"
        stroke="var(--coral)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="30" cy="16" r="7" fill="var(--coral-soft)" />
      <circle cx="72" cy="18" r="7" fill="var(--coral-soft)" />
      <circle cx="50" cy="40" r="6" fill="var(--coral-soft)" />
    </svg>
  );
}
