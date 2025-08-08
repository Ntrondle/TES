'use client'

import Link from 'next/link'
import { usePathname, useSearchParams, useSelectedLayoutSegments } from 'next/navigation'
import { useEffect, useState } from 'react'
import { locales } from '../i18n/locales'

// Builds /<locale>/<...restOfPath>
function withLocale(newLocale, segments) {
  const rest = segments.join('/')
  return `/${newLocale}${rest ? `/${rest}` : ''}`
}

export default function LangSwitcher({ locale, className = '' }) {
  const pathname = usePathname() || '/'
  const params = useSearchParams()
  const segments = useSelectedLayoutSegments() // everything after [locale]
  const [hash, setHash] = useState('')

  // Capture current hash after hydration so we preserve anchors like #what-we-do
  useEffect(() => {
    setHash(window.location.hash || '')
  }, [])

  const qs = params?.toString()
  const tail = `${qs ? `?${qs}` : ''}${hash}`

  return (
    <div className={className}>
      {locales.map((l, i) => {
        const targetBase = withLocale(l, segments)
        const href = `${targetBase}${tail}`
        const active = l === locale
        return (
          <Link key={l} href={href} className={`nav-link ${active ? 'font-semibold' : ''}`}>
            {l.toUpperCase()}{i < locales.length - 1 ? ' · ' : ''}
          </Link>
        )
      })}
    </div>
  )
}
