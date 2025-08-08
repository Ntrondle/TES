'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { locales } from '../i18n/locales'

function replaceLocale(pathname, newLocale) {
  const segs = pathname.split('/')
  // segs[0] === '' because pathname starts with '/'
  if (locales.includes(segs[1])) {
    segs[1] = newLocale           // /en/xyz -> /fr/xyz
  } else {
    segs.splice(1, 0, newLocale)  // /xyz -> /fr/xyz (if ever hit)
  }
  return segs.join('/') || `/${newLocale}`
}

export default function LangSwitcher({ locale, className = '' }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const qs = searchParams.toString()
  const hash = typeof window !== 'undefined' ? window.location.hash : ''

  return (
    <div className={className}>
      {locales.map((l, i) => {
        const newPath = replaceLocale(pathname || '/', l)
        const href = `${newPath}${qs ? `?${qs}` : ''}${hash || ''}`
        return (
          <Link key={l} href={href} className={`nav-link ${l === locale ? 'font-semibold' : ''}`}>
            {l.toUpperCase()}{i < locales.length - 1 ? ' · ' : ''}
          </Link>
        )
      })}
    </div>
  )
}
