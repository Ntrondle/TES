'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

export default function StepNavigation({ manualSlug, step, steps, locale, t }) {
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false)
  const hasTriggeredConfettiRef = useRef(false)
  const completionRef = useRef(null)
  const currentIndex = steps.findIndex(s => s.slug === step.slug)
  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null

  // Confetti effect function
  const triggerConfetti = () => {
    if (hasTriggeredConfettiRef.current) return

    const confetti = {
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e30613', '#3ca9e2', '#10b981', '#f59e0b', '#8b5cf6'],
      disableForReducedMotion: true,
      zIndex: 1000,
    }

    // Create confetti elements
    const createConfettiParticle = () => {
      const particle = document.createElement('div')
      particle.style.position = 'fixed'
      particle.style.width = '10px'
      particle.style.height = '10px'
      particle.style.borderRadius = '50%'
      particle.style.pointerEvents = 'none'
      particle.style.zIndex = '1000'
      particle.style.backgroundColor = confetti.colors[Math.floor(Math.random() * confetti.colors.length)]
      
      // Random starting position
      const startX = Math.random() * window.innerWidth
      const startY = -20
      particle.style.left = `${startX}px`
      particle.style.top = `${startY}px`

      // Random animation duration
      const duration = 2 + Math.random() * 2
      particle.style.transition = `all ${duration}s ease-out`

      document.body.appendChild(particle)

      // Animate
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`
        particle.style.opacity = '0'
      })

      // Cleanup
      setTimeout(() => {
        particle.remove()
      }, duration * 1000)
    }

    // Create multiple particles
    const delay = 50
    for (let i = 0; i < confetti.particleCount; i++) {
      setTimeout(() => {
        createConfettiParticle()
      }, i * delay)
    }

    hasTriggeredConfettiRef.current = true
    setHasTriggeredConfetti(true)
  }

  // Intersection Observer to trigger confetti when completion message comes into view
  useEffect(() => {
    const currentIndex = steps.findIndex(s => s.slug === step.slug)
    const isLastStep = currentIndex === steps.length - 1

    if (!isLastStep || !completionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredConfettiRef.current) {
            triggerConfetti()
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of element is visible
        rootMargin: '0px'
      }
    )

    observer.observe(completionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [step.slug, steps])

  return (
    <motion.div
      className="mt-12 pt-8 border-t border-neutral-300 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        {/* Previous Step */}
        {prevStep ? (
          <Link
            href={`/${locale}/manual/${manualSlug}/${prevStep.slug}`}
            className="flex-1 max-w-md"
          >
            <motion.div
              className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{t?.manuals?.step?.previous}</p>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {prevStep.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        ) : (
          <div className="flex-1"></div>
        )}

        {/* Step Progress */}
        <div className="px-4 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t?.manuals?.step?.prefix} {currentIndex + 1} {t?.manuals?.step?.of} {steps.length}
          </p>
          <div className="flex gap-1 mt-2 justify-center">
            {steps.map((s, index) => (
              <div
                key={s.slug}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-neutral-900 dark:bg-white'
                    : index < currentIndex
                    ? 'w-2 bg-neutral-400 dark:bg-neutral-600'
                    : 'w-2 bg-neutral-300 dark:bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next Step */}
        {nextStep ? (
          <Link
            href={`/${locale}/manual/${manualSlug}/${nextStep.slug}`}
            className="flex-1 max-w-md text-right"
          >
            <motion.div
              className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 justify-end">
                <div className="flex-1">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{t?.manuals?.step?.next}</p>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {nextStep.title}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </Link>
        ) : (
          <div className="flex-1 flex justify-end" ref={completionRef}>
            <motion.div
              className="p-4 rounded-lg border border-green-500 bg-green-50 dark:bg-green-900/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-green-600 dark:text-green-400 mb-1">{t?.manuals?.step?.complete}</p>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    {t?.manuals?.step?.completeMessage}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  )
}