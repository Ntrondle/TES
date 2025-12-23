'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, MapPin, Github, User, Zap } from 'lucide-react'

export default function AboutPage({ params: { locale } }) {
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
          ← Back to home
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
          About TES
        </h1>
      </motion.div>

      {/* Main Content */}
      <motion.section 
        className="prose prose-neutral dark:prose-invert max-w-none mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p className="text-lg">
          <strong className="text-neutral-900 dark:text-white">TES (Tröndle Embedded System)</strong> is a small Swiss embedded design studio run by Nicolas Tröndle. We help turn ideas into solid, working hardware by handling everything from PCB design to firmware and real-world testing.
        </p>
        <p>
          We've worked with ESP32, RP2040, and STM32 platforms, across CAN, USB, and Wi-Fi projects, with a strong focus on power and thermal constraints. Our approach is practical and detail-oriented: clean schematics, layouts that are easy to manufacture, and software that behaves reliably outside the lab.
        </p>
      </motion.section>

      {/* Values */}
      <motion.section 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          Our Values
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-fit mb-3">
              <Zap className="w-5 h-5 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              Quality First
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Every design is thoroughly tested and documented to ensure reliability.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-fit mb-3">
              <User className="w-5 h-5 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              Client Focused
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              We work closely with you to understand your needs and deliver solutions that work.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 w-fit mb-3">
              <Github className="w-5 h-5 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              Open & Transparent
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              We believe in clear communication and sharing our knowledge with the community.
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
          Contact
        </h2>
        
        <div className="space-y-4">
          <a 
            href="mailto:reach@tes-shop.ch"
            className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <Mail className="w-5 h-5 text-neutral-900 dark:text-white group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">Email</div>
              <div className="font-medium text-neutral-900 dark:text-white">reach@tes-shop.ch</div>
            </div>
          </a>

          <a 
            href="https://github.com/Trondle-Embedded-Systems"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <Github className="w-5 h-5 text-neutral-900 dark:text-white group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">GitHub</div>
              <div className="font-medium text-neutral-900 dark:text-white">Trondle-Embedded-Systems</div>
            </div>
          </a>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <MapPin className="w-5 h-5 text-neutral-900 dark:text-white" />
            </div>
            <div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">Location</div>
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
          Imprint
        </h2>
        
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-medium text-neutral-900 dark:text-white mb-1">Responsible</div>
              <div className="text-neutral-600 dark:text-neutral-300">
                Nicolas Tröndle<br />
                TES — Tröndle Embedded System
              </div>
            </div>

            <div>
              <div className="font-medium text-neutral-900 dark:text-white mb-1">Contact</div>
              <div className="text-neutral-600 dark:text-neutral-300">
                <a href="mailto:reach@tes-shop.ch" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  reach@tes-shop.ch
                </a>
              </div>
            </div>

            <div>
              <div className="font-medium text-neutral-900 dark:text-white mb-1">Location</div>
              <div className="text-neutral-600 dark:text-neutral-300">
                Lausanne<br />
                Switzerland
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                This website is hosted on GitHub Pages. The content of this website is protected by copyright. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
