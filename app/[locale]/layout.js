import { Suspense } from 'react'
import Link from 'next/link'
import Logo from '../components/Logo'
import LangSwitcher from '../components/LangSwitcher'
import MobileNav from '../components/MobileNav'
import { getDictionary } from '../i18n/getDictionary'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'de' }]
}

export async function generateMetadata({ params: { locale } }) {
  const t = await getDictionary(locale)
  
  const titles = {
    en: 'TES — Tröndle Embedded System',
    fr: 'TES — Tröndle Embedded System',
    de: 'TES — Tröndle Embedded System'
  }
  
  const descriptions = {
    en: 'Embedded systems: PCB design, firmware, and connected products. Swiss embedded design studio led by Nicolas Tröndle in Lausanne, Switzerland.',
    fr: 'Systèmes embarqués : conception de PCB, micrologiciel et produits connectés. Studio de conception suisse dirigé par Nicolas Tröndle à Lausanne, Suisse.',
    de: 'Embedded-Systeme: PCB-Design, Firmware und vernetzte Produkte. Schweizer Embedded-Designstudio unter der Leitung von Nicolas Tröndle in Lausanne, Schweiz.'
  }
  
  return {
    title: {
      default: titles[locale] || titles.en,
      template: `%s — TES`
    },
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      locale: locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : 'de_DE',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en
    }
  }
}

export default async function LocaleLayout({ children, params: { locale } }) {
  const t = await getDictionary(locale)
  const year = new Date().getFullYear()

  const navItems = [
    { href: `/${locale}`, label: t?.nav?.home ?? 'Home' },
    { href: `/${locale}/portfolio`, label: t?.nav?.portfolio ?? 'Portfolio' },
    { href: `/${locale}/services/pcb-design`, label: 'Services' },
    { href: `/${locale}/about`, label: t?.nav?.about ?? 'About' },
    { href: `/${locale}/manual`, label: t?.nav?.manual ?? 'Manual' },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-3">
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
            <Logo className="w-[120px] h-auto text-neutral-900 dark:text-white" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Suspense fallback={<span className="nav-link opacity-50">…</span>}>
              <LangSwitcher locale={locale} />
            </Suspense>
            <a href="mailto:reach@tes-shop.ch" className="nav-cta">
              {t?.nav?.contact ?? 'Contact'}
            </a>
          </div>

          {/* Mobile Navigation */}
          <MobileNav locale={locale} t={t} navItems={navItems} />
        </div>
      </header>

      <main className="container py-10">
        {children}
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-20 bg-gradient-to-b from-transparent to-neutral-50/50 dark:to-neutral-900/50">
        <div className="container py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side */}
            <div>
              <Link href={`/${locale}`} className="inline-block mb-4">
                <Logo className="w-[100px] h-auto text-neutral-900 dark:text-white" />
              </Link>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
                {t?.hero?.subtitle || 'We design and ship custom electronics: PCB design, firmware, and connected products.'}
              </p>
            </div>

            {/* Right Side */}
            <div className="flex flex-col items-start md:items-end gap-4 text-sm">
              <div className="text-neutral-900 dark:text-white font-medium">
                © {year} TES — Tröndle Embedded System
              </div>
              <div className="flex flex-wrap gap-3 text-neutral-600 dark:text-neutral-400">
                <a href="mailto:reach@tes-shop.ch" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  reach@tes-shop.ch
                </a>
                <span className="text-neutral-300 dark:text-neutral-700">·</span>
                <a 
                  href="https://github.com/Trondle-Embedded-Systems" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <span className="text-neutral-300 dark:text-neutral-700">·</span>
                <Link href={`/${locale}/about#imprint`} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  {t?.nav?.imprint ?? 'Imprint'}
                </Link>
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                Lausanne, Switzerland
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
