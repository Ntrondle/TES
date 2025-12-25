import { getDictionary } from '../../../../i18n/getDictionary'
import { getManual, getLocalizedManualStep } from '../../../../../lib/manuals'
import ManualViewer from '../../../../components/ManualViewer'

export async function generateStaticParams() {
  const { getManual, getManuals } = await import('../../../../../lib/manuals')
  const manuals = await getManuals()
  
  const params = []
  for (const manual of manuals) {
    // Get the full manual with steps
    const fullManual = await getManual(manual.slug)
    
    if (fullManual && fullManual.steps) {
      for (const step of fullManual.steps) {
        params.push({
          'pcb-name': manual.slug,
          step: step.slug
        })
      }
    }
  }
  
  return params
}

export default async function ManualStepPage({ params: { locale, 'pcb-name': pcbName, step: stepSlug } }) {
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
  
  // Get the specific step with localized content
  const step = await getLocalizedManualStep(pcbName, stepSlug, locale)
  
  if (!step) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Step Not Found
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300">
          The step "{stepSlug}" does not exist in the manual "{pcbName}".
        </p>
      </div>
    )
  }
  
  return (
    <ManualViewer 
      key={locale} 
      manual={manual}
      step={step}
      locale={locale}
      t={t}
    />
  )
}