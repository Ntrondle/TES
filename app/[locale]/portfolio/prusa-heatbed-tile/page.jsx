import Link from 'next/link'
import { getDictionary } from '../../../i18n/getDictionary'
import PCBViewer from '../../../components/PCBViewer'
import PortfolioContent from '../../../components/PortfolioContent'
import dynamic from 'next/dynamic'

// Dynamically import icon from public folder
const ProjectIcon = dynamic(() => import('../../../../public/portfolio/prusa-heatbed-tile/icon'), { ssr: false })

export async function generateMetadata({ params }) {
  return {
    title: 'Prusa HeatBed Tile PCB',
    description: 'Heated bed controller with precise temperature control and safety features.'
  }
}

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)

  return (
    <article className="max-w-4xl">
      <p className="mb-6">
        <Link href={`/${locale}/portfolio`} className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
          ← {t.common.backToPortfolio}
        </Link>
      </p>
      
      <div className="flex items-center gap-3 mb-4">
        <ProjectIcon />
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
          Prusa HeatBed Tile PCB
        </h1>
      </div>
      <p className="text-xl text-neutral-600 dark:text-neutral-300 mt-4">
        Heated bed controller with precise temperature control and safety features.
      </p>

      <div className="mt-8">
        <PCBViewer stepFile="/models/coaster.glb" />
      </div>

      <PortfolioContent readmePath="public/portfolio/prusa-heatbed-tile/README.md" locale={locale} />
    </article>
  )
}
