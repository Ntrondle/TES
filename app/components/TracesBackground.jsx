export default function TracesBackground() {
  const rows = [20, 60, 100, 140, 180, 220, 260, 300];
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none opacity-40 dark:opacity-30"
      viewBox="0 0 1200 340"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* soft fade at edges */}
        <linearGradient id="fadeX" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopOpacity="0" />
          <stop offset="10%" stopOpacity="1" />
          <stop offset="90%" stopOpacity="1" />
          <stop offset="100%" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="traceGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.65" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {rows.map((y, i) => (
        <g key={i} style={{ transform: `translateY(${i * 6}px)` }}>
          {/* “trace” */}
          <path
            d={`M0 ${y} Q 150 ${y - 30}, 300 ${y}
               T 600 ${y} T 900 ${y} T 1200 ${y}`}
            fill="none"
            stroke="url(#traceGrad)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="8 10"
            className="trace-animate"
            style={{ animationDuration: `${22 + i * 2}s` }}
          />
          {/* via “pads” */}
          {[150, 300, 450, 600, 750, 900, 1050].map((x, j) => (
            <circle
              key={j}
              cx={x}
              cy={y}
              r="2.2"
              fill="currentColor"
              opacity="0.35"
            />
          ))}
        </g>
      ))}

      {/* subtle top/bottom separators */}
      <rect x="0" y="0" width="1200" height="340" fill="url(#fadeX)" />
    </svg>
  );
}
