'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ManualClient({ t, locale }) {
  const [manuals, setManuals] = useState([])
  const [loading, setLoading] = useState(true)

  // Since we use static export, we need to fetch manuals directly
  useEffect(() => {
    async function fetchManuals() {
      try {
        // Fetch locale-specific manuals data from public directory
        const localeFile = locale === 'en' ? '_manuals.json' : `_manuals.${locale}.json`
        const response = await fetch(`/TES/manuals/${localeFile}`)
        if (!response.ok) {
          throw new Error('Failed to fetch manuals')
        }
        const data = await response.json()
        setManuals(data)
      } catch (error) {
        console.error('Error fetching manuals:', error)
        setManuals([])
      } finally {
        setLoading(false)
      }
    }
    fetchManuals()
  }, [locale])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link 
          href={`/${locale}`}
          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          &larr; Back to Home
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          Manuals
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Step-by-step guides for flashing and setting up your PCB boards
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.section 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-white"></div>
          </div>
        ) : manuals.length === 0 ? (
          <div className="p-12 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">No Manuals Available</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Manuals will be added here soon. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manuals.map((manual, index) => (
              <motion.div
                key={manual.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link href={`/${locale}/manual/${manual.slug}`}>
                  <motion.div
                    className="h-full p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Manual Icon */}
                    <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>

                    {/* Manual Title */}
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                      {manual.title}
                    </h3>

                    {/* Manual Description */}
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                      {manual.description}
                    </p>

                    {/* Step Count */}
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {manual.stepCount} {manual.stepCount === 1 ? 'step' : 'steps'}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  )
}
