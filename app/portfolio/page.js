import Link from 'next/link'
import {getDictionary} from '../i18n/getDictionary'

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)

  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h1 className="md-headline-large mb-4" style={{color: 'var(--md-on-background)'}}>
            {t.portfolio.title}
          </h1>
          <p className="md-body-large mb-12" style={{color: 'var(--md-on-surface-variant)'}}>
            {t.portfolio.subtitle}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href={`/${locale}/projects/heated-coaster`} className="md-card md-card-elevated block no-underline">
              <div className="aspect-video rounded-lg mb-4 flex items-center justify-center" style={{backgroundColor: 'var(--md-surface-variant)'}}>
                <svg className="w-12 h-12" style={{color: 'var(--md-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="md-title-large mb-2" style={{color: 'var(--md-on-surface)'}}>
                {t.projects.heated.title}
              </h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>
                {t.projects.heated.desc}
              </p>
            </Link>

            <Link href={`/${locale}/projects/esp32s3-led-bed`} className="md-card md-card-elevated block no-underline">
              <div className="aspect-video rounded-lg mb-4 flex items-center justify-center" style={{backgroundColor: 'var(--md-surface-variant)'}}>
                <svg className="w-12 h-12" style={{color: 'var(--md-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="md-title-large mb-2" style={{color: 'var(--md-on-surface)'}}>
                {t.projects.ledbed.title}
              </h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>
                {t.projects.ledbed.desc}
              </p>
            </Link>

            <Link href={`/${locale}/projects/rc-bms`} className="md-card md-card-elevated block no-underline">
              <div className="aspect-video rounded-lg mb-4 flex items-center justify-center" style={{backgroundColor: 'var(--md-surface-variant)'}}>
                <svg className="w-12 h-12" style={{color: 'var(--md-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="md-title-large mb-2" style={{color: 'var(--md-on-surface)'}}>
                {t.projects.rcbms.title}
              </h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>
                {t.projects.rcbms.desc}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
