'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '../../lib/utils'

export default function Card({ children, className, href, ...props }) {
  const Component = href ? Link : 'div'

  return (
    <Component
      href={href}
      className={cn(
        "group relative block border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6",
        "bg-white dark:bg-neutral-950",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'conic-gradient(from 0deg, #e30613, #3ca9e2, #e30613)',
            filter: 'blur(40px)',
            opacity: '0.15'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Subtle inner glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </Component>
  )
}
