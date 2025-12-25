'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import StepContent from './StepContent'
import StepNavigation from './StepNavigation'

export default function ManualViewer({ manual, step, locale, t }) {
  const modelPath = `/manuals/${manual.slug}/${manual.modelFile}`

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link 
          href={`/${locale}/manual`}
          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          ← {t?.manuals?.backToManuals}
        </Link>
      </motion.div>

      {/* Manual Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-2">
          {manual.title}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {manual.description}
        </p>
      </motion.div>

      {/* Step Content */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          {/* Step Header */}
          <div className="mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
              {step.title}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t?.manuals?.step?.prefix} {manual.steps.findIndex(s => s.slug === step.slug) + 1} {t?.manuals?.step?.of} {manual.stepCount}
            </p>
          </div>

          {/* Step Content */}
          <StepContent content={step.content} modelPath={modelPath} t={t} />

          {/* Navigation */}
          <StepNavigation 
            manualSlug={manual.slug}
            step={step}
            steps={manual.steps}
            locale={locale}
            t={t}
          />
        </div>
      </motion.div>

      {/* Back to Manuals Button */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href={`/${locale}/manual`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t?.manuals?.backToAllManuals}
        </Link>
      </motion.div>
    </div>
  )
}