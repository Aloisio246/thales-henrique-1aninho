import type { CSSProperties } from "react";

export function Seaweed({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 120" className={className} style={style} role="presentation">
      <path
        d="M20 120 C6 96 34 80 18 58 C4 38 30 22 20 2"
        stroke="var(--aqua)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M28 120 C40 98 16 86 30 64 C40 46 22 32 30 14"
        stroke="var(--aqua-soft)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}
