'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ManualClient({ t, locale, manuals }) {
  // Data is passed as prop from server component, no fetching needed

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          {t?.manuals?.title}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {t?.manuals?.subtitle}
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.section 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {manuals.length === 0 ? (
          <div className="p-12 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{t?.manuals?.noManuals?.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {t?.manuals?.noManuals?.description}
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
                    className="h-full p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all cursor-pointer relative overflow-hidden group"
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
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

                    {/* Subtle inner glow on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Manual Icon */}
                      <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                        {manual.hasCustomIcon ? (
                          <img 
                            src={`/manuals/${manual.slug}/icon.svg`} 
                            alt={manual.title}
                            className="w-6 h-6 h-auto brightness-0 dark:invert"
                          />
                        ) : (
                          <svg className="w-6 h-6 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        )}
                      </div>

                      {/* Manual Title */}
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                        {manual.title}
                      </h3>

                      {/* Manual Description */}
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                        {manual.description}
                      </p>

                      {/* Metadata: Author and Date */}
                      <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                        {/* Author */}
                        {manual.author && (
                          <div className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="truncate max-w-[120px]">{manual.author}</span>
                          </div>
                        )}
                        {/* Date */}
                        {manual.date && (
                          <div className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(manual.date).toLocaleDateString(locale)}</span>
                          </div>
                        )}
                      </div>

                      {/* Step Count */}
                      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {manual.stepCount} {manual.stepCount === 1 ? t?.manuals?.step?.singular : t?.manuals?.step?.plural}
                      </div>
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