export function ShellMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true" focusable="false">
      <path
        d="M11 43C8 30 18 15 32 14c14 1 24 16 21 29L43 51H21L11 43Z"
        fill="currentColor"
        fillOpacity=".25"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M32 15v31M20 19l7 27M44 19l-7 27M12 34l11 13M52 34 41 47"
        stroke="currentColor"
        strokeOpacity=".72"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M22 52c4-3 16-3 20 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
