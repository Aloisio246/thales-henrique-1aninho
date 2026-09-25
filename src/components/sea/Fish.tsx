export function Fish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} role="presentation">
      {/* cauda */}
      <g className="anim-fin" style={{ transformOrigin: "22px 40px" }}>
        <path d="M28 40 L4 20 L10 40 L4 60 Z" fill="var(--coral)" />
      </g>
      {/* corpo */}
      <ellipse cx="66" cy="40" rx="38" ry="24" fill="var(--coral)" />
      <ellipse
        cx="66"
        cy="40"
        rx="38"
        ry="24"
        fill="none"
        stroke="var(--coral-soft)"
        strokeWidth="3"
      />
      {/* nadadeira superior */}
      <g className="anim-fin" style={{ transformOrigin: "62px 20px", animationDuration: "1.6s" }}>
        <path d="M52 20 L74 8 L78 22 Z" fill="var(--coral-soft)" />
      </g>
      {/* nadadeira inferior */}
      <g className="anim-fin" style={{ transformOrigin: "62px 60px", animationDuration: "1.9s" }}>
        <path d="M54 60 L72 72 L78 58 Z" fill="var(--coral-soft)" />
      </g>
      {/* listras */}
      <path d="M60 20 q6 20 0 40" stroke="var(--shell)" strokeWidth="5" fill="none" opacity="0.8" />
      <path d="M78 24 q6 16 0 32" stroke="var(--shell)" strokeWidth="4" fill="none" opacity="0.6" />
      {/* olho */}
      <circle cx="94" cy="34" r="5" fill="var(--shell)" />
      <circle cx="95" cy="34" r="2.4" fill="var(--deep)" />
    </svg>
  );
}
