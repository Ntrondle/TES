'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import TracesBackground from '../components/TracesBackground'
import Card from '../components/Card'
import { ArrowRight, Cpu, Code, Zap, Wrench } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function Page({ params: { locale } }) {
  // We'll get translations on the server, but for now use inline data
  const t = {
    hero: {
      titleLine1: "Embedded systems,",
      titleLine2: "built right.",
      subtitle: "We design and ship custom electronics: PCB design, firmware, and connected products. From idea to tested prototypes."
    },
    buttons: {
      start: "Start a project",
      seeWork: "See work",
      whatWeDo: "What we do"
    },
    sections: {
      whatWeDo: "What we do",
      selected: "Selected highlights"
    },
    services: {
      pcb: {
        title: "Custom PCB design",
        desc: "4-layer and compact boards with solid grounding, careful routing, and manufacturing-ready outputs."
      },
      firmware: {
        title: "Firmware & connectivity",
        desc: "Bare‑metal drivers and RTOS work; ESP‑IDF/Arduino, RP2040 SDK, Klipper integrations."
      },
      power: {
        title: "Power & thermal design",
        desc: "Efficient regulators, protection, and thermal considerations for reliable devices."
      },
      proto: {
        title: "Prototyping & test",
        desc: "Bring-up, measurement, and test jigs to validate ideas quickly."
      }
    },
    projects: {
      heated: {
        title: "Heated Coaster — Smart & Safe",
        desc: "USB‑PD to 24 V with safe negotiation, thermal control, and fail‑safes."
      },
      ledbed: {
        title: "ESP32‑S3 LED Bed — Matrix Controller",
        desc: "High‑density LED driving with ESP32‑S3, clean power, and connectivity."
      },
      rcbms: {
        title: "RC Car Control & BMS Board",
        desc: "Battery management, dual motor drive, CAN/USB comms, protected power path."
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 overflow-hidden">
        <div className="container relative overflow-visible">
          <TracesBackground className="z-0" />
          
          <motion.div 
            className="relative max-w-4xl mx-auto text-center pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20 overflow-visible z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="space-y-1">
                <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight overflow-visible">
                  <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent">
                    {t.hero.titleLine1}
                  </span>
                </div>
                <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#e30613] mb-4 overflow-visible pb-2">
                  {t.hero.titleLine2}
                </div>
              </h1>
            </motion.div>

            <motion.p 
              className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300"
              variants={itemVariants}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-4"
              variants={itemVariants}
            >
              <a 
                className={cn(
                  "group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                  "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
                  "hover:shadow-lg hover:shadow-neutral-900/20 hover:scale-105"
                )}
                href="mailto:reach@tes-shop.ch"
              >
                {t.buttons.start}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              
              <Link 
                className={cn(
                  "group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                  "border border-neutral-300 dark:border-neutral-700",
                  "text-neutral-900 dark:text-white",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                )}
                href={`/${locale}/portfolio`}
              >
                {t.buttons.seeWork}
              </Link>
              
              <Link 
                className={cn(
                  "group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                  "border border-neutral-300 dark:border-neutral-700",
                  "text-neutral-900 dark:text-white",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                )}
                href="#what-we-do"
              >
                {t.buttons.whatWeDo}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="mt-20">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
            {t.sections.whatWeDo}
          </h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card>
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <Cpu className="w-6 h-6 text-neutral-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {t.services.pcb.title}
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300">
                {t.services.pcb.desc}
              </p>
            </motion.div>
          </Card>

          <Card>
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <Code className="w-6 h-6 text-neutral-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {t.services.firmware.title}
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300">
                {t.services.firmware.desc}
              </p>
            </motion.div>
          </Card>

          <Card>
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <Zap className="w-6 h-6 text-neutral-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {t.services.power.title}
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300">
                {t.services.power.desc}
              </p>
            </motion.div>
          </Card>

          <Card>
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <Wrench className="w-6 h-6 text-neutral-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {t.services.proto.title}
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300">
                {t.services.proto.desc}
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </section>


      {/* CTA Section */}
      <section className="mt-20">
        <motion.div
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#e30613]/10 to-[#3ca9e2]/10" />
          
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to start your project?
            </h2>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Let's turn your ideas into reality. Get in touch and let's discuss how we can help you build the perfect embedded system.
            </p>
            <a
              href="mailto:reach@tes-shop.ch"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get in touch
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>
    </>
  )
}
