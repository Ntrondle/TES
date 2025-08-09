'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { locales } from '../i18n/locales'

export default function LangSwitcher({ locale, className = '' }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // drop the leading locale segment, keep the rest of the path
  const segments = pathname.split('/').filter(Boolean).slice(1)
  const rest = segments.length ? `/${segments.join('/')}` : ''

  function handleChange(e) {
    const nextLocale = e.target.value
    const query = searchParams.toString()
    const suffix = query ? `?${query}` : ''
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    router.push(`/${nextLocale}${rest}${suffix}${hash}`)
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      className={`nav-link bg-transparent ${className}`}
    >
      {locales.map(l => (
        <option key={l} value={l}>{l.toUpperCase()}</option>
      ))}
    </select>
  )
}
