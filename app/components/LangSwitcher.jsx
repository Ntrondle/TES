'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { locales } from '../i18n/locales'
import { cn } from '../../lib/utils'
import { ChevronDown, Check } from 'lucide-react'

const localeNames = {
  en: 'English',
  fr: 'Français', 
  de: 'Deutsch'
}

export default function LangSwitcher({ locale, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dropdownRef = useRef(null)

  const pathWithoutLocale = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean).slice(1)
    return segments.length ? `/${segments.join('/')}` : ''
  }, [pathname])

  const handleLocaleChange = useCallback((nextLocale) => {
    const query = searchParams.toString()
    const suffix = query ? `?${query}` : ''
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    router.push(`/${nextLocale}${pathWithoutLocale}${suffix}${hash}`)
    setIsOpen(false)
  }, [router, pathWithoutLocale, searchParams])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-between gap-2",
          "bg-neutral-100 dark:bg-neutral-800",
          "text-neutral-700 dark:text-neutral-200",
          "px-4 py-2.5 pr-3 rounded-xl",
          "text-sm font-medium",
          "hover:opacity-80 transition-opacity duration-200",
          "active:scale-95 transition-transform duration-200",
          "focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600",
          "shadow-sm cursor-pointer select-none",
          "min-w-[140px]"
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">{localeNames[locale]}</span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute right-0 top-full mt-2 z-50",
              "bg-white dark:bg-neutral-900",
              "rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800",
              "w-full overflow-hidden"
            )}
          >
          <ul 
            className="py-1"
            role="listbox"
            aria-label="Language options"
          >
            {locales.map((lang) => (
              <li key={lang} role="option" aria-selected={locale === lang}>
                <button
                  onClick={() => handleLocaleChange(lang)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5",
                    "text-sm font-medium transition-colors duration-200",
                    "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                    locale === lang
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-700 dark:text-neutral-300"
                  )}
                >
                  <span>{localeNames[lang]}</span>
                  {locale === lang && (
                    <Check className="w-4 h-4 flex-shrink-0" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
