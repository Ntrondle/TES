'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '../components/Card'

export default function PortfolioPage({ params: { locale } }) {
  const projects = [
    {
      href: `/${locale}/portfolio/prusa-heatbed-tile`,
      image: '/images/at2-led-bed/at2.png',
      title: 'Prusa HeatBed Tile PCB',
      description: 'Heated bed controller with USB-C Power Delivery input and Hall effect sensor for interactive beverage detection.'
    },
    {
      href: `/${locale}/portfolio/at2-led-bed`,
      image: '/images/at2-led-bed/at2.png',
      title: 'AT2 3D Printer LED Bed',
      description: 'Four-layer control board driving addressable LEDs for decorative and functional feedback on a 3D printer.'
    },
    {
      href: `/${locale}/portfolio/microflip`,
      image: '/images/at2-led-bed/at2.png',
      title: 'MicroFlip',
      description: 'Ultra-compact polarity-reverser board for N20-size brushed DC gear-motors.'
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
        className="grid md:grid-cols-3 gap-6 mt-8"
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
              <div className="h-48 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain p-4"
                />
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
