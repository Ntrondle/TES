import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '../../../i18n/getDictionary'
import { getPortfolioProject } from '../../../../lib/portfolio'
import PCBViewer from '../../../components/PCBViewer'
import PortfolioContent from '../../../components/PortfolioContent'

export async function generateMetadata({ params }) {
  const project = await getPortfolioProject(params.project)
  
  if (!project) {
    return {
      title: 'Project Not Found'
    }
  }

  return {
    title: project.title,
    description: project.description
  }
}

export async function generateStaticParams() {
  const { getPortfolioProjects } = await import('../../../../lib/portfolio')
  const projects = await getPortfolioProjects()
  
  return projects.map((project) => ({
    project: project.slug
  }))
}

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)
  const project = await getPortfolioProject(params.project)

  if (!project) {
    notFound()
  }

  return (
    <article className="max-w-4xl">
      <p className="mb-6">
        <Link href={`/${locale}/portfolio`} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
          ← {t.common.backToPortfolio}
        </Link>
      </p>
      
      <div className="flex items-center gap-3 mb-4">
        {project.hasIcon && (
          <img 
            src={`/TES/portfolio/${project.slug}/icon.svg`}
            alt={project.title}
            className="w-12 h-12"
          />
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
          {project.title}
        </h1>
      </div>
      <p className="text-xl text-neutral-600 dark:text-neutral-300 mt-4">
        {project.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:shadow-md"
          >
            <img 
              src="/TES/github.svg" 
              alt="GitHub" 
              className="w-5 h-5 text-neutral-900 dark:text-white"
            />
            View on GitHub
          </a>
        )}
        {project.shopLink && (
          <a
            href={project.shopLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white dark:from-white dark:to-neutral-100 dark:text-neutral-900 hover:shadow-lg hover:scale-105"
          >
            <img 
              src="/TES/tes-shop.svg" 
              alt="TES-shop" 
              className="w-5 h-5 text-white dark:text-neutral-900"
            />
            Buy on TES-shop
          </a>
        )}
      </div>

      {project.modelFile && (
        <div className="mt-8">
          <PCBViewer stepFile={`/TES/portfolio/${project.slug}/${project.modelFile}`} />
        </div>
      )}

      <PortfolioContent 
        readmePath={`public/portfolio/${project.slug}/README.md`} 
        locale={locale} 
      />
    </article>
  )
}
