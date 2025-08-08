export const metadata = { title: 'About — TES' }

import {getDictionary} from '../i18n/getDictionary'

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)
  return (
    <section className="max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-tight">{t.about.title}</h1>
      <p className="mt-4">
        <strong>TES (Tröndle Embedded System)</strong> {t.about.p1.replace('TES (Tröndle Embedded System) ', '')}
      </p>
      <p className="mt-3">{t.about.p2}</p>
    </section>
  )
}
