import Link from 'next/link'
import {getDictionary} from '../i18n/getDictionary'

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)

  return (
    <section className="max-w-5xl">
      <h1 className="text-4xl font-semibold tracking-tight">{t.portfolio.title}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{t.portfolio.subtitle}</p>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Link href="/projects/heated-coaster" className="card hover:no-underline">
          <h3 className="font-semibold">Heated Coaster — Smart &amp; Safe</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mt-1">USB‑PD to 24 V with safe negotiation, thermal control, and fail‑safes.</p>
        </Link>

        <Link href="/projects/esp32s3-led-bed" className="card hover:no-underline">
          <h3 className="font-semibold">ESP32‑S3 LED Bed — Matrix Controller</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mt-1">High‑density LED driving with ESP32‑S3, clean power, and connectivity.</p>
        </Link>

        <Link href="/projects/rc-bms" className="card hover:no-underline">
          <h3 className="font-semibold">RC Car Control &amp; BMS Board</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mt-1">Battery management, dual motor drive, CAN/USB comms, protected power path.</p>
        </Link>
      </div>
    </section>
  )
}
