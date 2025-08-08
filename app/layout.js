import Link from 'next/link'
import './globals.css'
import Logo from './components/Logo'

export const metadata = {
  title: 'TES — Tröndle Embedded System',
  description: 'Embedded systems: PCB design, firmware, and connected products. Lausanne, Switzerland.',
  openGraph: { images: ['/og.jpg'] },
  themeColor: '#0a0a0a',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Logo className="w-[120px] h-auto text-neutral-900 dark:text-white" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/portfolio" className="nav-link">Portfolio</Link>
              <a href="mailto:hello@tes.swiss" className="nav-cta">Contact</a>
            </nav>

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
