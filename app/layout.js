import Link from 'next/link'
import '../globals.css'
import Logo from '../components/Logo'
import LangSwitcher from '../components/LangSwitcher'
import {getDictionary} from '../i18n/getDictionary'

export async function generateStaticParams() {
  return [{locale:'en'},{locale:'fr'},{locale:'de'}]
}

export default async function LocaleLayout({ children, params: { locale } }) {
  const t = await getDictionary(locale)

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body>
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="container flex items-center justify-between py-3">
            <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
              <Logo className="w-[120px] h-auto text-neutral-900 dark:text-white" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link href={`/${locale}`} className="nav-link">{t.nav.home}</Link>
              <Link href={`/${locale}/about`} className="nav-link">{t.nav.about}</Link>
              <Link href={`/${locale}/portfolio`} className="nav-link">{t.nav.portfolio}</Link>
              <a href="mailto:hello@tes.swiss" className="nav-cta">{t.nav.contact}</a>
            </nav>

            <div className="md:flex hidden">
              <LangSwitcher locale={locale} />
            </div>

            <div className="md:hidden">
              <a href="mailto:hello@tes.swiss" className="nav-cta">{t.nav.contact}</a>
            </div>
          </div>
        </header>

        <main className="container py-10">{children}</main>

        <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-10">
          <div className="container py-6 text-sm text-neutral-500 flex flex-wrap gap-2 justify-between">
            <div>© {new Date().getFullYear()} TES — Tröndle Embedded System · Lausanne, Switzerland</div>
            <div className="flex gap-2">
              <a href="mailto:hello@tes.swiss">hello@tes.swiss</a>
              <span>·</span>
              <a href="https://github.com/" target="_blank">GitHub</a>
              <span>·</span>
              <a href="#">Imprint</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
