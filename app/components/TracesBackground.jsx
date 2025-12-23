'use client'

import { motion } from 'framer-motion'

export default function TracesBackground() {
  const rows = [20, 60, 100, 140, 180, 220, 260, 300]
  
  return (
    <motion.svg
      className="absolute inset-0 h-full w-full pointer-events-none opacity-50 dark:opacity-35"
      viewBox="0 0 1200 340"
      preserveAspectRatio="none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1 }}
    >
      <defs>
        {/* Enhanced fade gradient */}
        <linearGradient id="fadeX" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopOpacity="0.05" />
          <stop offset="15%" stopOpacity="0.35" />
          <stop offset="85%" stopOpacity="0.35" />
          <stop offset="100%" stopOpacity="0.05" />
        </linearGradient>
        
        {/* Multi-color gradient for traces */}
        <linearGradient id="traceGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="25%" stopColor="#e30613" stopOpacity="0.5" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.7" />
          <stop offset="75%" stopColor="#3ca9e2" stopOpacity="0.5" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {rows.map((y, i) => (
        <g key={i} style={{ transform: `translateY(${i * 6}px)` }}>
          {/* Animated trace */}
          <motion.path
            d={`M0 ${y} Q 150 ${y - 30}, 300 ${y}
               T 600 ${y} T 900 ${y} T 1200 ${y}`}
            fill="none"
            stroke="url(#traceGrad)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="8 12"
            filter="url(#glow)"
            className="trace-animate"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -2000 }}
            transition={{
              duration: 22 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Via pads with pulse animation */}
          {[150, 300, 450, 600, 750, 900, 1050].map((x, j) => (
            <motion.circle
              key={j}
              cx={x}
              cy={y}
              r="2.5"
              fill="currentColor"
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: (i * 0.1) + (j * 0.05),
                ease: "easeInOut"
              }}
            />
          ))}
        </g>
      ))}

      {/* Subtle top/bottom separators */}
      <rect x="0" y="0" width="1200" height="340" fill="url(#fadeX)" />
    </motion.svg>
  )
}
