'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { locales } from '../i18n/locales'

export default function LangSwitcher({ locale, className = '' }) {
  const [segments, setSegments] = useState([])
  const [search, setSearch] = useState('')
  const [hash, setHash] = useState('')

  // Hydrate current URL on client (no Next navigation hooks needed)
  useEffect(() => {
    const { pathname, search, hash } = window.location
    // pathname like: /en/projects/rc-bms -> keep everything after the locale
    const parts = pathname.split('/').filter(Boolean) // ["en","projects","rc-bms"]
    setSegments(parts.slice(1)) // ["projects","rc-bms"] or [] for homepage
    setSearch(search || '')
    setHash(hash || '')
  }, [])

  // SSR fallback: links point to locale home until hydrated
  const rest = segments.length ? `/${segments.join('/')}` : ''

  return (
    <div className={className}>
      {locales.map((l, i) => {
        const href = `/${l}${rest}${search}${hash}`
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
