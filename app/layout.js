import './globals.css'

export const metadata = {
  metadataBase: new URL('https://ntrondle.github.io/TES'),
  title: 'TES — Tröndle Embedded System',
  description: 'Embedded systems: PCB design, firmware, and connected products. Lausanne, Switzerland.',
  openGraph: { images: ['/og.jpg'] },
  }

export const viewport = { themeColor: '#0a0a0a' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
