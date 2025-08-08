import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TES — Tröndle Embedded System',
  description: 'Embedded systems: PCB design, firmware, and connected products. Lausanne, Switzerland.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'TES — Tröndle Embedded System',
    description: 'We design embedded systems: PCB design, firmware, connected products.',
    images: ['/og.jpg'],
  },
}

export const viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header className="border-b border-neutral-200 dark:border-neutral-800">

          <div className="container flex items-center justify-between py-3">
            <a href="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/logo.svg"
                alt="TES — Tröndle Embedded System"
                className="h-7 w-auto"
              />
            </a>

            <nav className="hidden md:flex items-center gap-1">
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/portfolio" className="nav-link">Portfolio</a>
              <a href="mailto:hello@tes.swiss" className="nav-cta">Contact</a>

            </nav>

            {/* Mobile: hamburger (optional, minimal) */}
            <div className="md:hidden">
              <a href="mailto:hello@tes.swiss" className="nav-cta">Contact</a>
            </div>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-10">
          <div className="container py-6 text-sm text-neutral-500 flex flex-wrap gap-2 justify-between">
            <div>© {new Date().getFullYear()} TES — Tröndle Embedded System · Lausanne, Switzerland</div>
            <div className="flex gap-2">
              <a href="mailto:hello@tes.swiss">hello@tes.swiss</a>
              <span>·</span>
              <a href="https://github.com/" target="_blank">GitHub</a>
              <span>·</span>
              <a href="#">Imprint</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
