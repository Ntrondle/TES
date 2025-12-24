import { getDictionary } from '../../../i18n/getDictionary'
import { getManual } from '../../../../lib/manuals'
import ManualViewer from '../../../components/ManualViewer'

export async function generateStaticParams() {
  const { getManuals } = await import('../../../../lib/manuals')
  const manuals = await getManuals()
  
  return manuals.map((manual) => ({
    'pcb-name': manual.slug
  }))
}

export default async function ManualStepPage({ params: { locale, 'pcb-name': pcbName } }) {
  const t = await getDictionary(locale)
  
  // Get the manual
  const manual = await getManual(pcbName, locale)
  
  if (!manual) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Manual Not Found
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300">
          The manual "{pcbName}" does not exist.
        </p>
      </div>
    )
  }
  
  // Default to first step if no step specified
  const firstStepSlug = manual.steps[0]?.slug
  
  return (
    <ManualViewer 
      key={locale} 
      manual={manual}
      step={manual.steps[0]}
      locale={locale}
    />
  )
}
