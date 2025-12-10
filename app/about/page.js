export const metadata = { title: 'About — TES' }

import {getDictionary} from '../i18n/getDictionary'

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h1 className="md-headline-large mb-8" style={{color: 'var(--md-on-background)'}}>
            {t.about.title}
          </h1>

          <div className="md-card md-card-elevated mb-6">
            <p className="md-body-large" style={{color: 'var(--md-on-surface)'}}>
              <strong style={{color: 'var(--md-primary)'}}>TES (Tröndle Embedded System)</strong> {t.about.p1.replace('TES (Tröndle Embedded System) ', '')}
            </p>
          </div>

          <div className="md-card md-card-filled">
            <p className="md-body-large" style={{color: 'var(--md-on-surface)'}}>{t.about.p2}</p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <div className="md-card md-card-elevated">
              <h3 className="md-title-large mb-3" style={{color: 'var(--md-on-surface)'}}>Location</h3>
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>
                Lausanne, Switzerland
              </p>
            </div>
            <div className="md-card md-card-elevated">
              <h3 className="md-title-large mb-3" style={{color: 'var(--md-on-surface)'}}>Get in touch</h3>
              <a href="mailto:hello@tes.swiss" className="md-body-medium" style={{color: 'var(--md-primary)'}}>
                hello@tes.swiss
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
