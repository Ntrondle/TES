import { Suspense } from 'react'
import Link from 'next/link'
import Logo from '../components/Logo'
import LangSwitcher from '../components/LangSwitcher'
import { getDictionary } from '../i18n/getDictionary'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'de' }]
}

export default async function LocaleLayout({ children, params: { locale } }) {
  const t = await getDictionary(locale)
  const year = new Date().getFullYear()

  return (
    <>
      <header className="md-nav">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
              <Logo className="w-[120px] h-auto" style={{color: 'var(--md-primary)'}} />
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <Link href={`/${locale}`} className="md-nav-link">{t?.nav?.home ?? 'Home'}</Link>
              <Link href={`/${locale}/projects`} className="md-nav-link">{t?.nav?.projects ?? 'Projects'}</Link>
              <Link href={`/${locale}/portfolio`} className="md-nav-link">{t?.nav?.portfolio ?? 'Portfolio'}</Link>
              <Link href={`/${locale}/about`} className="md-nav-link">{t?.nav?.about ?? 'About'}</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Suspense fallback={<span className="md-nav-link opacity-50">…</span>}>
                <LangSwitcher locale={locale} />
              </Suspense>
              <a href="mailto:hello@tes.swiss" className="md-btn md-btn-filled hidden sm:inline-flex">
                {t?.nav?.contact ?? 'Contact'}
              </a>
              <a href="mailto:hello@tes.swiss" className="md-btn md-btn-text sm:hidden">
                {t?.nav?.contact ?? 'Contact'}
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        {children}
      </main>

      <footer style={{backgroundColor: 'var(--md-surface-variant)', borderTop: '1px solid var(--md-outline-variant)'}}>
        <div className="container py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <Logo className="w-[120px] h-auto mb-4" style={{color: 'var(--md-primary)'}} />
              <p className="md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>
                Embedded systems: PCB design, firmware, and connected products.
              </p>
            </div>
            <div>
              <h3 className="md-title-medium mb-3" style={{color: 'var(--md-on-surface)'}}>Links</h3>
              <ul className="space-y-2">
                <li><Link href={`/${locale}`} className="md-body-medium hover:underline" style={{color: 'var(--md-on-surface-variant)'}}>{t?.nav?.home ?? 'Home'}</Link></li>
                <li><Link href={`/${locale}/portfolio`} className="md-body-medium hover:underline" style={{color: 'var(--md-on-surface-variant)'}}>{t?.nav?.portfolio ?? 'Portfolio'}</Link></li>
                <li><Link href={`/${locale}/about`} className="md-body-medium hover:underline" style={{color: 'var(--md-on-surface-variant)'}}>{t?.nav?.about ?? 'About'}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="md-title-medium mb-3" style={{color: 'var(--md-on-surface)'}}>Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:hello@tes.swiss" className="md-body-medium hover:underline" style={{color: 'var(--md-on-surface-variant)'}}>hello@tes.swiss</a></li>
                <li><a href="https://github.com/Trondle-Embeeded-Systems" target="_blank" rel="noreferrer" className="md-body-medium hover:underline" style={{color: 'var(--md-on-surface-variant)'}}>GitHub</a></li>
              </ul>
            </div>
          </div>
          <hr className="md-divider my-6" />
          <div className="flex flex-wrap gap-4 justify-between items-center md-body-medium" style={{color: 'var(--md-on-surface-variant)'}}>
            <div>© {year} TES — Tröndle Embedded System</div>
            <div>Lausanne, Switzerland</div>
          </div>
        </div>
      </footer>
    </>
  )
}
