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

        <div className="grid md:grid-cols-2 gap-6 mt-4 justify-items-center">
          <div className="card max-w-md">
            <h3 className="text-lg font-semibold">{t.services.pcb.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">{t.services.pcb.desc}</p>
          </div>
          <div className="card max-w-md">
            <h3 className="text-lg font-semibold">{t.services.firmware.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">{t.services.firmware.desc}</p>
          </div>
          <div className="card max-w-md">
            <h3 className="text-lg font-semibold">{t.services.power.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">{t.services.power.desc}</p>
          </div>
          <div className="card max-w-md">
            <h3 className="text-lg font-semibold">{t.services.proto.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">{t.services.proto.desc}</p>
          </div>
        </div>
      </section>

      {/* separator */}
      <div className="relative my-10 h-px">
        <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'conic-gradient(from 0deg, #d52b1e, #ffffff, #3ca9e2, #2e7d32, #e0e0e0, #d52b1e)' }}
        />
      </div>


      <section id="portfolio" className="mt-10">
        <h2 className="text-2xl font-semibold text-center">{t.sections.selected}</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <Link href={`/${locale}/projects/heated-coaster`} className="card hover:no-underline">
            <h3 className="font-semibold">{t.projects.heated.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">{t.projects.heated.desc}</p>
          </Link>

          <Link href={`/${locale}/projects/esp32s3-led-bed`} className="card hover:no-underline">
            <h3 className="font-semibold">{t.projects.ledbed.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">{t.projects.ledbed.desc}</p>
          </Link>

          <Link href={`/${locale}/projects/rc-bms`} className="card hover:no-underline">
            <h3 className="font-semibold">{t.projects.rcbms.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">{t.projects.rcbms.desc}</p>
          </Link>
        </div>
      </section>
    </>
  )
}
