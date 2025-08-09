'use client'


import { usePathname, useRouter } from 'next/navigation'

import { locales } from '../i18n/locales'

export default function LangSwitcher({ locale, className = '' }) {
  const router = useRouter()
  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean).slice(1)
  const rest = segments.length ? `/${segments.join('/')}` : ''
  const search = searchParams.toString()
  const query = search ? `?${search}` : ''

  function handleChange(e) {
    const nextLocale = e.target.value
    router.push(`/${nextLocale}${rest}${query}${hash}`)
  }

  function handleChange(e) {
    const nextLocale = e.target.value
    const search = window.location.search
    const hash = window.location.hash
    router.push(`/${nextLocale}${rest}${search}${hash}`)
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
