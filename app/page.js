'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { locales, defaultLocale } from './i18n/locales'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Detect user's preferred language
    const userLang = navigator.language.split('-')[0].toLowerCase()

    // Check if detected language is supported
    const detectedLocale = locales.includes(userLang) ? userLang : defaultLocale

    // Redirect to the appropriate locale
    router.replace(`/${detectedLocale}`)
  }, [router])

  // Show minimal loading state
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div>Loading...</div>
    </div>
  )
}
