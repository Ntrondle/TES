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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
