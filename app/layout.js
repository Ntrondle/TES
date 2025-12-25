import './globals.css'

export const metadata = {
  metadataBase: new URL('https://ntrondle.github.io'),
  title: {
    default: 'TES — Tröndle Embedded System',
    template: '%s — TES'
  },
  description: 'Embedded systems: PCB design, firmware, and connected products. Swiss embedded design studio led by Nicolas Tröndle in Lausanne, Switzerland.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/favicon.png',
  },
  keywords: ['embedded systems', 'PCB design', 'firmware', 'ESP32', 'STM32', 'RP2040', 'IoT', 'electronics design', 'Switzerland', 'Lausanne'],
  authors: [{ name: 'Nicolas Tröndle' }],
  creator: 'Nicolas Tröndle',
  publisher: 'TES — Tröndle Embedded System',
  openGraph: { 
    type: 'website',
    locale: 'en_US',
    url: 'https://ntrondle.github.io/TES',
    title: 'TES — Tröndle Embedded System',
    description: 'Embedded systems: PCB design, firmware, and connected products.',
    siteName: 'TES — Tröndle Embedded System',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'TES — Tröndle Embedded System'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TES — Tröndle Embedded System',
    description: 'Embedded systems: PCB design, firmware, and connected products.',
    images: ['/og.jpg'],
    creator: '@ntrondle'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code'
  }
}

export const viewport = { 
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}