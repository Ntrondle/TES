'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '../../components/Card'
import { Zap, Cpu, Code, Thermometer, Wifi, ChevronRight } from 'lucide-react'

export default function PortfolioPage({ params: { locale } }) {
  const projects = [
    {
      href: `/${locale}/portfolio/prusa-heatbed-tile`,
      icon: Thermometer,
      iconColor: 'text-[#e30613]',
      bgGradient: 'from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20',
      title: 'Prusa HeatBed Tile PCB',
      description: 'ESP32-S3 based control PCB with USB-C PD input and Hall effect weight detection.'
    },
    {
      href: `/${locale}/portfolio/at2-led-bed`,
      icon: Wifi,
      iconColor: 'text-[#3ca9e2]',
      bgGradient: 'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      title: 'AT2 3D Printer LED Bed',
      description: 'Compact 4-layer board driving addressable LEDs with ESP32-C3FH4.'
    },
    {
      href: `/${locale}/portfolio/microflip`,
      icon: ChevronRight,
      iconColor: 'text-green-600',
      bgGradient: 'from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
      title: 'MicroFlip',
      description: 'Ultra-compact polarity-reverser board for N20-size brushed DC gear-motors.'
    },
    {
      href: `/${locale}/portfolio/heated-coaster`,
      icon: Zap,
      iconColor: 'text-[#e30613]',
      bgGradient: 'from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20',
      title: 'Heated Coaster — Smart & Safe',
      description: 'USB-PD to 24 V with safe negotiation, thermal control, and fail-safes.'
    },
    {
      href: `/${locale}/portfolio/esp32s3-led-bed`,
      icon: Cpu,
      iconColor: 'text-[#3ca9e2]',
      bgGradient: 'from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      title: 'ESP32-S3 LED Bed — Matrix Controller',
      description: 'High-density LED driving with ESP32-S3, clean power, and connectivity.'
    },
    {
      href: `/${locale}/portfolio/rc-bms`,
      icon: Code,
      iconColor: 'text-green-600',
      bgGradient: 'from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
      title: 'RC Car Control & BMS Board',
      description: 'Battery management, dual motor drive, CAN/USB comms, protected power path.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

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
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          Portfolio
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-300">
          A few projects we've built recently.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <Card 
            key={index}
            href={project.href}
            className="hover:no-underline h-full"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className={`h-32 mb-4 rounded-xl bg-gradient-to-br ${project.bgGradient} flex items-center justify-center`}>
                <project.icon className={`w-12 h-12 ${project.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {project.description}
              </p>
            </motion.div>
          </Card>
        ))}
      </motion.div>
    </div>
  )
}
