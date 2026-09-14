export function Turtle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 110" className={className} role="presentation">
      {/* nadadeira traseira */}
      <g className="anim-fin" style={{ transformOrigin: "48px 78px", animationDuration: "2.6s" }}>
        <ellipse cx="40" cy="82" rx="16" ry="8" fill="var(--aqua)" />
      </g>
      {/* nadadeira dianteira */}
      <g className="anim-fin" style={{ transformOrigin: "106px 74px", animationDuration: "2.2s" }}>
        <ellipse cx="118" cy="80" rx="20" ry="9" fill="var(--aqua)" />
      </g>
      {/* casco */}
      <ellipse cx="78" cy="56" rx="52" ry="34" fill="var(--ocean)" />
      <ellipse cx="78" cy="56" rx="52" ry="34" fill="none" stroke="var(--aqua)" strokeWidth="4" />
      <circle cx="78" cy="52" r="12" fill="var(--aqua-soft)" opacity="0.85" />
      <circle cx="52" cy="60" r="8" fill="var(--aqua-soft)" opacity="0.7" />
      <circle cx="104" cy="60" r="8" fill="var(--aqua-soft)" opacity="0.7" />
      {/* cabeça */}
      <circle cx="136" cy="46" r="15" fill="var(--aqua)" />
      <circle cx="142" cy="42" r="2.6" fill="var(--deep)" />
    </svg>
  );
}
