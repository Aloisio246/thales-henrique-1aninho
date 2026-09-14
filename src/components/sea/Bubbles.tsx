const BUBBLES = [
  { left: "8%", size: 10, duration: 16, delay: 0 },
  { left: "18%", size: 6, duration: 13, delay: -4 },
  { left: "31%", size: 14, duration: 20, delay: -9 },
  { left: "44%", size: 8, duration: 15, delay: -2 },
  { left: "57%", size: 11, duration: 18, delay: -11 },
  { left: "69%", size: 6, duration: 12, delay: -6 },
  { left: "80%", size: 13, duration: 21, delay: -14 },
  { left: "92%", size: 8, duration: 17, delay: -8 },
];

export function Bubbles() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {BUBBLES.map((bubble) => (
        <span
          key={bubble.left}
          className="anim-bubble absolute bottom-0 rounded-full border border-white/70 bg-white/25"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
