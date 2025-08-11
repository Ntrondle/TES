'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useCallback } from 'react'
import { locales } from '../i18n/locales'

const localeNames = {
  en: 'English',
  fr: 'Français', 
  de: 'Deutsch'
}

export default function LangSwitcher({ locale, className = '' }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pathWithoutLocale = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean).slice(1)
    return segments.length ? `/${segments.join('/')}` : ''
  }, [pathname])

  const handleChange = useCallback((e) => {
    const nextLocale = e.target.value
    const query = searchParams.toString()
    const suffix = query ? `?${query}` : ''
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    router.push(`/${nextLocale}${pathWithoutLocale}${suffix}${hash}`)
  }, [router, pathWithoutLocale, searchParams])

  return (
    <select
      value={locale}
      onChange={handleChange}
      className={`nav-link bg-transparent ${className}`}
    >
      {locales.map(l => (
        <option key={l} value={l}>{localeNames[l] || l.toUpperCase()}</option>
      ))}
    </select>
  )
}
