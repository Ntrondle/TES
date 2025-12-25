'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, MapPin, Github, User, Zap } from 'lucide-react'

export default function AboutClient({ t, locale }) {
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
          dangerouslySetInnerHTML={{ __html: t?.about?.backToHome }}
        />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
          {t?.about?.title}
        </h1>
      </motion.div>

      {/* Main Content */}
      <motion.section 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p 
          className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t?.about?.intro?.p1 }}
        />
        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mt-4" dangerouslySetInnerHTML={{ __html: t?.about?.intro?.p2 }} />
      </motion.section>

      {/* Values */}
      <motion.section 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {t?.about?.valuesTitle}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-fit mb-3">
              <Zap className="w-5 h-5 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              {t?.about?.values?.quality?.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {t?.about?.values?.quality?.description}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-fit mb-3">
              <User className="w-5 h-5 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              {t?.about?.values?.client?.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {t?.about?.values?.client?.description}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-fit mb-3">
              <Github className="w-5 h-5 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              {t?.about?.values?.open?.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {t?.about?.values?.open?.description}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact Info */}
      <motion.section 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {t?.about?.contactTitle}
        </h2>
        
        <div className="space-y-4">
          <a 
            href="mailto:reach@tes-shop.ch"
            className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors group relative overflow-hidden"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'conic-gradient(from 0deg, #e30613, #3ca9e2, #e30613)',
                  filter: 'blur(40px)',
                  opacity: '0.15'
                }}
              />
            </div>

            {/* Subtle inner glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-3 w-full">
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <Mail className="w-5 h-5 text-neutral-900 dark:text-white group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">{t?.about?.contact?.email}</div>
                <div className="font-medium text-neutral-900 dark:text-white">reach@tes-shop.ch</div>
              </div>
            </div>
          </a>

          <a 
            href="https://github.com/Trondle-Embedded-Systems"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors group relative overflow-hidden"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'conic-gradient(from 0deg, #e30613, #3ca9e2, #e30613)',
                  filter: 'blur(40px)',
                  opacity: '0.15'
                }}
              />
            </div>

            {/* Subtle inner glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-3 w-full">
              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <Github className="w-5 h-5 text-neutral-900 dark:text-white group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">{t?.about?.contact?.github}</div>
                <div className="font-medium text-neutral-900 dark:text-white">Trondle-Embedded-Systems</div>
              </div>
            </div>
          </a>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <MapPin className="w-5 h-5 text-neutral-900 dark:text-white" />
            </div>
            <div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">{t?.about?.contact?.location}</div>
              <div className="font-medium text-neutral-900 dark:text-white">Lausanne, Switzerland</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Imprint Section */}
      <motion.section 
        id="imprint"
        className="mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {t?.about?.imprint?.title}
        </h2>
        
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-medium text-neutral-900 dark:text-white mb-1">{t?.about?.imprint?.responsible}</div>
              <div className="text-neutral-600 dark:text-neutral-300">
                Nicolas Tröndle<br />
                TES — Tröndle Embedded System
              </div>
            </div>

            <div>
              <div className="font-medium text-neutral-900 dark:text-white mb-1">{t?.about?.imprint?.contact}</div>
              <div className="text-neutral-600 dark:text-neutral-300">
                <a href="mailto:reach@tes-shop.ch" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  reach@tes-shop.ch
                </a>
              </div>
            </div>

            <div>
              <div className="font-medium text-neutral-900 dark:text-white mb-1">{t?.about?.imprint?.location}</div>
              <div className="text-neutral-600 dark:text-neutral-300">
                Lausanne<br />
                Switzerland
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {t?.about?.imprint?.copyright}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}