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
          <div className="container flex items-center justify-between py-4">
            <a href="/" className="font-semibold tracking-tight">TES <span className="text-neutral-500">Tröndle Embedded System</span></a>
            <nav className="flex gap-4">
              <a href="/" className="hover:opacity-80">Home</a>
              <a href="/about" className="hover:opacity-80">About</a>
              <a href="/portfolio" className="hover:opacity-80">Portfolio</a>
              <a href="mailto:hello@trondle.ch" className="btn">Contact</a>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-10">
          <div className="container py-6 text-sm text-neutral-500 flex flex-wrap gap-2 justify-between">
            <div>© {new Date().getFullYear()} TES — Tröndle Embedded System · Lausanne, Switzerland</div>
            <div className="flex gap-2">
              <a href="mailto:hello@.trondle.ch">hello@trondle.ch</a>
              <span>·</span>
              <a href="https://github.com/orgs/Trondle-Embeeded-Systems/repositories" target="_blank">GitHub</a>
              <span>·</span>
              <a href="#">Imprint</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
