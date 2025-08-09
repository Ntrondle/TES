'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { locales } from '../i18n/locales'

export default function LangSwitcher({ locale, className = '' }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [hash, setHash] = useState('')

  // track hash to preserve anchor navigation when switching languages
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash || '')
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const segments = pathname.split('/').filter(Boolean).slice(1)
  const rest = segments.length ? `/${segments.join('/')}` : ''
  const search = searchParams.toString()
  const query = search ? `?${search}` : ''

  function handleChange(e) {
    const nextLocale = e.target.value
    router.push(`/${nextLocale}${rest}${query}${hash}`)
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      className={`nav-link bg-transparent ${className}`}
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  )
}
