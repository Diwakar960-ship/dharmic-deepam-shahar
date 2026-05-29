export function Diya({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      {/* Flame */}
      <g className="animate-flicker" style={{ transformOrigin: "32px 28px" }}>
        <path
          d="M32 6 C28 14 24 18 24 26 C24 32 28 36 32 36 C36 36 40 32 40 26 C40 18 36 14 32 6 Z"
          fill="url(#flameGrad)"
        />
        <path
          d="M32 14 C30 18 28 21 28 26 C28 30 30 32 32 32 C34 32 36 30 36 26 C36 21 34 18 32 14 Z"
          fill="oklch(0.95 0.15 95)"
        />
      </g>
      {/* Lamp */}
      <path
        d="M10 40 Q32 56 54 40 L50 46 Q32 58 14 46 Z"
        fill="url(#lampGrad)"
        stroke="oklch(0.36 0.14 25)"
        strokeWidth="0.8"
      />
      <ellipse cx="32" cy="40" rx="22" ry="4" fill="oklch(0.45 0.16 30)" />
      <defs>
        <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.18 90)" />
          <stop offset="60%" stopColor="oklch(0.75 0.22 55)" />
          <stop offset="100%" stopColor="oklch(0.58 0.22 38)" />
        </linearGradient>
        <linearGradient id="lampGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.65 0.18 40)" />
          <stop offset="100%" stopColor="oklch(0.42 0.16 28)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Lotus({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="url(#petalGrad)" stroke="oklch(0.58 0.22 38)" strokeWidth="0.6">
        <ellipse cx="32" cy="22" rx="6" ry="14" />
        <ellipse cx="32" cy="22" rx="6" ry="14" transform="rotate(45 32 32)" />
        <ellipse cx="32" cy="22" rx="6" ry="14" transform="rotate(-45 32 32)" />
        <ellipse cx="32" cy="22" rx="6" ry="14" transform="rotate(90 32 32)" />
        <ellipse cx="32" cy="22" rx="6" ry="14" transform="rotate(-90 32 32)" />
      </g>
      <circle cx="32" cy="32" r="5" fill="oklch(0.86 0.16 92)" />
      <defs>
        <linearGradient id="petalGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.16 95)" />
          <stop offset="100%" stopColor="oklch(0.68 0.20 45)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Om({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontSize: size,
        fontFamily: "var(--font-display)",
        color: "oklch(0.58 0.22 38)",
        lineHeight: 1,
        display: "inline-block",
      }}
      aria-hidden="true"
    >
      ॐ
    </span>
  );
}
