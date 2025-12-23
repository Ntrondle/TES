'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Cpu, ArrowRight, CheckCircle2, Layers, Zap, Shield } from 'lucide-react'
import { cn } from '../../../../lib/utils'

export default function PcbDesignPage({ params: { locale } }) {
  const features = [
    {
      icon: Layers,
      title: "Multi-layer Boards",
      description: "Expert design for 2-8 layer PCBs with optimal stack-up for signal integrity and EMI control"
    },
    {
      icon: Zap,
      title: "Power Integrity",
      description: "Careful power plane design and decoupling strategies for stable voltage distribution"
    },
    {
      icon: Shield,
      title: "Signal Integrity",
      description: "Controlled impedance routing, differential pairs, and proper termination strategies"
    },
    {
      icon: CheckCircle2,
      title: "Manufacturing Ready",
      description: "Complete design for manufacturability (DFM) considerations and Gerber outputs"
    }
  ]

  const process = [
    {
      step: "01",
      title: "Requirements Analysis",
      description: "Understand your electrical, mechanical, and environmental requirements"
    },
    {
      step: "02",
      title: "Schematic Capture",
      description: "Create detailed schematics with proper component selection and documentation"
    },
    {
      step: "03",
      title: "PCB Layout",
      description: "Optimized layout with careful attention to routing, placement, and thermal considerations"
    },
    {
      step: "04",
      title: "Design Review",
      description: "Comprehensive DRC/DRC checks and design reviews before manufacturing"
    }
  ]

  const technologies = [
    "Altium Designer", "KiCad", "Eagle", "OrCAD", "EasyEDA"
  ]

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
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
            <Cpu className="w-8 h-8 text-[#e30613]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            Custom PCB Design
          </h1>
        </div>
        <p className="text-xl text-neutral-600 dark:text-neutral-300 mt-4">
          Professional PCB design services from concept to manufacturing-ready outputs. We deliver high-quality boards optimized for performance, reliability, and cost.
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
          Our Capabilities
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
                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0">
                    <feature.icon className="w-5 h-5 text-neutral-900 dark:text-white" />
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
          Design Process
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
          Tools & Technologies
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
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a custom PCB?
          </h2>
          <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
            Whether it's a simple single-layer board or a complex multi-layer design, we've got you covered.
          </p>
          <a
            href="mailto:reach@tes-shop.ch?subject=PCB%20Design%20Inquiry"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Get a quote
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.section>
    </div>
  )
}
