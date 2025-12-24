'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TerminalBlock({ command }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="my-4">
      <motion.div
        className="rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-200 dark:bg-neutral-800 border-b border-neutral-300 dark:border-neutral-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 ml-2 font-mono">
              terminal
            </span>
          </div>
          <motion.button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-neutral-300 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </>
            )}
          </motion.button>
        </div>

        {/* Terminal Content */}
        <div className="p-4 font-mono text-sm">
          <code className="text-neutral-800 dark:text-neutral-200">
            <span className="text-green-600 dark:text-green-400">$ </span>
            {command}
          </code>
        </div>
      </motion.div>
    </div>
  )
}
