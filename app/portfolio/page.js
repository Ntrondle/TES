import Link from 'next/link'
import {getDictionary} from '../i18n/getDictionary'

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)

  return (
    <section className="max-w-5xl">
      <h1 className="text-4xl font-semibold tracking-tight">{t.portfolio.title}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{t.portfolio.subtitle}</p>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Link href="/projects/heated-coaster" className="card hover:no-underline">
          <h3 className="font-semibold">{t.projects.heated.title}</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mt-1">{t.projects.heated.desc}</p>
        </Link>

        <Link href="/projects/esp32s3-led-bed" className="card hover:no-underline">
          <h3 className="font-semibold">{t.projects.ledbed.title}</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mt-1">{t.projects.ledbed.desc}</p>
        </Link>

        <Link href="/projects/rc-bms" className="card hover:no-underline">
          <h3 className="font-semibold">{t.projects.rcbms.title}</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mt-1">{t.projects.rcbms.desc}</p>
        </Link>
      </div>
    </section>
  )
}
