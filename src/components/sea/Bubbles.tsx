const BUBBLES = [
  { left: "5%", size: 5, duration: 26, delay: -3, drift: 4, opacity: 0.22 },
  { left: "11%", size: 12, duration: 15, delay: -8, drift: -4, opacity: 0.4 },
  { left: "15%", size: 6, duration: 29, delay: -17, drift: -3, opacity: 0.2 },
  { left: "8%", size: 10, duration: 18, delay: -13, drift: 4, opacity: 0.34 },
  { left: "86%", size: 5, duration: 28, delay: -9, drift: 3, opacity: 0.2 },
  { left: "91%", size: 13, duration: 17, delay: -5, drift: -4, opacity: 0.38 },
  { left: "95%", size: 6, duration: 30, delay: -19, drift: -3, opacity: 0.21 },
  { left: "83%", size: 11, duration: 20, delay: -12, drift: 4, opacity: 0.36 },
];

export function Bubbles() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {BUBBLES.map((bubble) => (
        <span
          key={`${bubble.left}-${bubble.size}`}
          className="anim-bubble absolute bottom-0 rounded-full border border-white/70 bg-white/25"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            ["--bubble-drift" as string]: `${bubble.drift}px`,
            ["--bubble-opacity" as string]: bubble.opacity,
          }}
        />
      ))}
    </div>
  );
}
