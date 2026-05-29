import { useMemo } from "react";

export function FloatingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        duration: 14 + Math.random() * 18,
        delay: Math.random() * 12,
        size: 10 + Math.random() * 18,
        rotate: Math.random() * 360,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p, i) => (
        <svg
          key={i}
          className="animate-float-petal absolute"
          style={{
            left: `${p.left}%`,
            bottom: `-40px`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.55,
            transform: `rotate(${p.rotate}deg)`,
          }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2 C7 7 7 13 12 22 C17 13 17 7 12 2 Z"
            fill="oklch(0.78 0.18 50)"
            stroke="oklch(0.58 0.22 38)"
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </div>
  );
}
