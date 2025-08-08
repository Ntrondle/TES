import Link from 'next/link'
import TracesBackground from '../components/TracesBackground'
import {getDictionary} from '../i18n/getDictionary'

export function generateStaticParams() { return [{locale:'en'},{locale:'fr'},{locale:'de'}] }

export default async function Page({ params: { locale } }) {
  const t = await getDictionary(locale)
  return (
    <>
      <section className="py-12 relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <div className="container">
          <TracesBackground />
          <div className="relative max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              {t.hero.titleLine1} <span className="block">{t.hero.titleLine2}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-300">{t.hero.subtitle}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a className="btn btn-primary rounded-xl" href="mailto:hello@tes.swiss">{t.buttons.start}</a>
              <Link className="btn btn-outline rounded-xl" href={`/${locale}#portfolio`}>{t.buttons.seeWork}</Link>
              <Link className="btn btn-outline rounded-xl" href={`/${locale}#what-we-do`}>{t.buttons.whatWeDo}</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="what-we-do" className="border-t border-neutral-200 dark:border-neutral-800 mt-10 pt-10">
        <h2 className="text-2xl font-semibold text-center">{t.sections.whatWeDo}</h2>
        {/* Reuse your existing cards below as-is for now */}
      </section>

      <section id="portfolio" className="mt-10">
        <h2 className="text-2xl font-semibold text-center">{t.sections.selected}</h2>
        {/* Reuse your existing project cards here */}
      </section>
    </>
  )
}
