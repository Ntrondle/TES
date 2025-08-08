export const metadata = { title: 'Proto — TES' }

import {getDictionary} from '../../i18n/getDictionary'

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)
  return (
    <section className="max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-tight">{t.services.proto.title}</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-300">{t.services.proto.desc}</p>

    </section>
  )
}
