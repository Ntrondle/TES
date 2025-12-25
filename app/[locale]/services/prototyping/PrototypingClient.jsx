'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Wrench, ArrowRight, Search, Settings, ClipboardCheck } from 'lucide-react'

export default function PrototypingClient({ services, t, locale }) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
            <Wrench className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            {t.servicePages.prototyping.title}
          </h1>
        </div>
        <p className="text-xl text-neutral-600 dark:text-neutral-300 mt-4">
          {t.servicePages.prototyping.subtitle}
        </p>
      </motion.div>

      {/* Services */}
      <section className="mt-12">
        <motion.h2 
          className="text-2xl font-bold text-neutral-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.servicePages.prototyping.servicesTitle}
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, index) => (
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
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
              {t.servicePages.prototyping.ctaTitle}
            </h2>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              {t.servicePages.prototyping.ctaSubtitle}
            </p>
            <a
              href="mailto:reach@tes-shop.ch?subject=Prototyping%20Inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {t.servicePages.prototyping.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  )
}