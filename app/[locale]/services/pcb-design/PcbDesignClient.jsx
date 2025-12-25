'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Cpu, ArrowRight, CheckCircle2, Layers, Zap, Shield } from 'lucide-react'
import { cn } from '../../../../lib/utils'

export default function PcbDesignClient({ features, process, technologies, t, locale }) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
            <Cpu className="w-8 h-8 text-[#e30613]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            {t.servicePages.pcbDesign.title}
          </h1>
        </div>
        <p className="text-xl text-neutral-600 dark:text-neutral-300 mt-4">
          {t.servicePages.pcbDesign.subtitle}
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
          {t.servicePages.pcbDesign.featuresTitle}
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

      {/* Process */}
      <section className="mt-12">
        <motion.h2 
          className="text-2xl font-bold text-neutral-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.servicePages.pcbDesign.processTitle}
        </motion.h2>

        <div className="space-y-4">
          {process.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#e30613] to-[#d52b1e] flex items-center justify-center text-white font-bold">
                {item.step}
              </div>
              <div className="flex-1 pb-6 border-b border-neutral-200 dark:border-neutral-800 last:border-0 last:pb-0">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="mt-12">
        <motion.h2 
          className="text-2xl font-bold text-neutral-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.servicePages.pcbDesign.technologiesTitle}
        </motion.h2>

        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
            >
              {tech}
            </span>
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
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#e30613]/10 to-[#3ca9e2]/10" />
          
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t.servicePages.pcbDesign.ctaTitle}
            </h2>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              {t.servicePages.pcbDesign.ctaSubtitle}
            </p>
            <a
              href="mailto:reach@tes-shop.ch?subject=PCB%20Design%20Inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {t.servicePages.pcbDesign.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  )
}