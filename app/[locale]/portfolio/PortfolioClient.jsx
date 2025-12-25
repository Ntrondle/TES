'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '../../components/Card'

export default function PortfolioClient({ projects, t, locale }) {
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
          dangerouslySetInnerHTML={{ __html: t?.common?.backToHome ?? '← Back to home' }}
        />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          {t?.portfolio?.title ?? 'Portfolio'}
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-300">
          {t?.portfolio?.subtitle ?? 'A few projects we\'ve built recently.'}
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="grid md:grid-cols-3 gap-6 mt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.length === 0 ? (
          <motion.div 
            className="col-span-3 text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-neutral-600 dark:text-neutral-400">
              {t?.portfolio?.noProjects ?? 'No projects found.'}
            </p>
          </motion.div>
        ) : (
          projects.map((project) => (
            <Card 
              key={project.slug}
              href={`/${locale}/portfolio/${project.slug}`}
              className="hover:no-underline h-full"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="h-48 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                  {project.hasThumbnail ? (
                    <img 
                      src={`/portfolio/${project.slug}/thumbnail.png?v=${project.slug}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-neutral-400 dark:text-neutral-600">
                      {project.hasIcon ? (
                        <img 
                          src={`/portfolio/${project.slug}/icon.svg`}
                          alt={project.title}
                          className="w-16 h-16"
                        />
                      ) : (
                        <span className="text-4xl">📁</span>
                      )}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                {project.date && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    {new Date(project.date).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                )}
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {project.description}
                </p>
              </motion.div>
            </Card>
          ))
        )}
      </motion.div>
    </div>
  )
}