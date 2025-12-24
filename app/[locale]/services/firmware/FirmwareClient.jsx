'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code, ArrowRight, Bluetooth, Wifi, HardDrive, Terminal } from 'lucide-react'

export default function FirmwareClient({ features, platforms, t, locale }) {
  return (
    <div className="max-w-4xl mx-auto">
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
          ← {t.common.backToPortfolio}
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20">
            <Code className="w-8 h-8 text-[#3ca9e2]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            {t.servicePages.firmware.title}
          </h1>
        </div>
        <p className="text-xl text-neutral-600 dark:text-neutral-300 mt-4">
          {t.servicePages.firmware.subtitle}
        </p>
      </motion.div>

      {/* Features */}
      <section className="mt-12">
        <motion.h2 
          className="text-2xl font-bold text-neutral-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.servicePages.firmware.featuresTitle}
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0 text-neutral-900 dark:text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section className="mt-12">
        <motion.h2 
          className="text-2xl font-bold text-neutral-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.servicePages.firmware.platformsTitle}
        </motion.h2>

        <motion.div 
          className="grid md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
            >
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                {platform.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                {platform.description}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <motion.section 
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.servicePages.firmware.ctaTitle}
          </h2>
          <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
            {t.servicePages.firmware.ctaSubtitle}
          </p>
          <a
            href="mailto:reach@tes-shop.ch?subject=Firmware%20Development%20Inquiry"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {t.servicePages.firmware.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.section>
    </div>
  )
}
