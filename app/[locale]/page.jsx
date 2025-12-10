import Link from 'next/link'
import {getDictionary} from '../i18n/getDictionary'

export function generateStaticParams() { return [{locale:'en'},{locale:'fr'},{locale:'de'}] }

export default async function Page({ params: { locale } }) {
  const t = await getDictionary(locale)
  return (
    <>
      {/* Hero Section */}
      <section className="md-hero">
        <div className="container">
          <div className="relative max-w-4xl mx-auto text-center z-10">
            <h1 className="md-headline-large sm:text-5xl md:text-6xl lg:text-7xl font-light" style={{color: 'var(--md-on-background)'}}>
              {t.hero.titleLine1}<br />
              <span style={{color: 'var(--md-primary)', fontWeight: 500}}>{t.hero.titleLine2}</span>
            </h1>
            <p className="md-body-large mt-6 max-w-2xl mx-auto" style={{color: 'var(--md-on-surface-variant)'}}>
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a className="md-btn md-btn-filled" href="mailto:hello@tes.swiss">
                {t.buttons.start}
              </a>
              <Link className="md-btn md-btn-outlined" href={`/${locale}/portfolio`}>
                {t.buttons.seeWork}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <h2 className="md-headline-medium text-center mb-12" style={{color: 'var(--md-on-background)'}}>
            {t.sections.whatWeDo}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="md-card md-card-elevated">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(198, 40, 40, 0.1)'}}>
                <svg className="w-6 h-6" style={{color: 'var(--md-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="md-title-large mb-2" style={{color: 'var(--md-on-surface)'}}>{t.services.pcb.title}</h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>{t.services.pcb.desc}</p>
            </div>

            <div className="md-card md-card-elevated">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(198, 40, 40, 0.1)'}}>
                <svg className="w-6 h-6" style={{color: 'var(--md-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="md-title-large mb-2" style={{color: 'var(--md-on-surface)'}}>{t.services.firmware.title}</h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>{t.services.firmware.desc}</p>
            </div>

            <div className="md-card md-card-elevated">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(198, 40, 40, 0.1)'}}>
                <svg className="w-6 h-6" style={{color: 'var(--md-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="md-title-large mb-2" style={{color: 'var(--md-on-surface)'}}>{t.services.power.title}</h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>{t.services.power.desc}</p>
            </div>

            <div className="md-card md-card-elevated">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(198, 40, 40, 0.1)'}}>
                <svg className="w-6 h-6" style={{color: 'var(--md-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="md-title-large mb-2" style={{color: 'var(--md-on-surface)'}}>{t.services.proto.title}</h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>{t.services.proto.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="md-divider" />

      {/* Projects Section */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <h2 className="md-headline-medium text-center mb-12" style={{color: 'var(--md-on-background)'}}>
            {t.sections.selected}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href={`/${locale}/projects/heated-coaster`} className="md-card md-card-elevated block no-underline">
              <div className="aspect-video rounded-lg mb-4 flex items-center justify-center" style={{backgroundColor: 'var(--md-surface-variant)'}}>
                <svg className="w-12 h-12" style={{color: 'var(--md-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="md-title-large mb-2" style={{color: 'var(--md-on-surface)'}}>{t.projects.heated.title}</h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>{t.projects.heated.desc}</p>
            </Link>

            <Link href={`/${locale}/projects/esp32s3-led-bed`} className="md-card md-card-elevated block no-underline">
              <div className="aspect-video rounded-lg mb-4 flex items-center justify-center" style={{backgroundColor: 'var(--md-surface-variant)'}}>
                <svg className="w-12 h-12" style={{color: 'var(--md-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="md-title-large mb-2" style={{color: 'var(--md-on-surface)'}}>{t.projects.ledbed.title}</h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>{t.projects.ledbed.desc}</p>
            </Link>

            <Link href={`/${locale}/projects/rc-bms`} className="md-card md-card-elevated block no-underline">
              <div className="aspect-video rounded-lg mb-4 flex items-center justify-center" style={{backgroundColor: 'var(--md-surface-variant)'}}>
                <svg className="w-12 h-12" style={{color: 'var(--md-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="md-title-large mb-2" style={{color: 'var(--md-on-surface)'}}>{t.projects.rcbms.title}</h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>{t.projects.rcbms.desc}</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
