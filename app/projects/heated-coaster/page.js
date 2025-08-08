import Link from 'next/link'
import {getDictionary} from '../../i18n/getDictionary'

export default async function Page({ params }) { 
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)

  return (
    <article className="max-w-3xl">
      <p className="mb-4"><Link href={`/${locale}/portfolio`} className="nav-link">{t.common.backToPortfolio}</Link></p>
      <h1 className="text-3xl font-semibold tracking-tight">Heated Coaster — Smart & Safe</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">USB‑PD negotiation up to 24 V, temperature control with safe cutoffs, and a robust power path.</p>
    </article>
  )
}
