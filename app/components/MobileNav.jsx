'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu, Mail } from 'lucide-react'
import Link from 'next/link'
import Logo from './Logo'
import { cn } from '../../lib/utils'

export default function MobileNav({ locale, t, navItems }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Get current path without locale prefix
  const getPathWithoutLocale = (path) => {
    const segments = path.split('/').filter(Boolean)
    if (segments[0] && ['en', 'fr', 'de'].includes(segments[0])) {
      return '/' + segments.slice(1).join('/')
    }
    return path
  }

  const currentPath = getPathWithoutLocale(pathname)

  // Animation variants
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  }

  const menuVariants = {
    closed: { 
      opacity: 0,
      scale: 0.95,
      y: -20
    },
    open: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    }
  }

  const linkVariants = {
    closed: { 
      opacity: 0,
      x: -20
    },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        type: 'spring',
        damping: 20,
        stiffness: 150
      }
    })
  }

  const footerVariants = {
    closed: { 
      opacity: 0,
      y: 20
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        type: 'spring',
        damping: 20,
        stiffness: 150
      }
    }
  }

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "inline-flex items-center justify-center p-2.5 rounded-xl",
          "text-neutral-700 dark:text-neutral-200",
          "hover:bg-neutral-100 dark:hover:bg-neutral-800",
          "transition-all duration-200 active:scale-95"
        )}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />

            {/* Dropdown Menu Card */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed left-0 right-0 top-0 z-[101] mx-0 mt-0"
            >
              <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] mx-4 mt-4">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
                <Link href={`/${locale}`} onClick={() => setIsOpen(false)}>
                  <Logo className="w-[100px] h-auto text-neutral-900 dark:text-white" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "inline-flex items-center justify-center p-2.5 rounded-xl",
                    "text-neutral-700 dark:text-neutral-200",
                    "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                    "transition-all duration-200 active:scale-95"
                  )}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center px-6">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      custom={index}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-5 py-4 rounded-2xl text-2xl font-semibold",
                          "text-neutral-900 dark:text-white",
                          "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                          "transition-all duration-200 active:scale-98"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer Section */}
              <motion.div
                variants={footerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="px-6 pb-6 pt-4 space-y-6"
              >
                {/* Language Switcher */}
                <div>
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3 px-1">
                    {t?.nav?.lang || 'Language'}
                  </p>
                  <div className="flex gap-2">
                    {['en', 'fr', 'de'].map((lang) => (
                      <Link
                        key={lang}
                        href={`/${lang}${currentPath}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex-1 px-4 py-3 rounded-xl text-sm font-medium",
                          "transition-all duration-200 active:scale-95",
                          locale === lang
                            ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-lg"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:opacity-80"
                        )}
                      >
                        {lang.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact Button with Swiss Red Accent */}
                <a
                  href="mailto:reach@tes-shop.ch"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl",
                    "bg-[#e30613] text-white",
                    "text-base font-semibold shadow-lg hover:shadow-xl",
                    "transition-all duration-200 active:scale-98",
                    "hover:bg-[#b80510]"
                  )}
                >
                  <Mail className="w-5 h-5" />
                  {t?.nav?.contact || 'Contact'}
                </a>
              </motion.div>
                {/* Extra rounded bottom for better aesthetics */}
                <div className="pb-4"></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}