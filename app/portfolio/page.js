import Link from 'next/link'
import {getDictionary} from '../i18n/getDictionary'

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)
  return (
    <section className="max-w-5xl">
      <h1 className="text-4xl font-semibold tracking-tight">{t.portfolio.title}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{t.portfolio.subtitle}</p>

      {/* Existing project cards below */}
          <div className="card">{content}</div>

  )
}

export default function Page() {
  return (
    <section className="max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-tight">Portfolio</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">Some of the work and experiments we can talk about publicly.</p>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <Project href="/projects/heated-coaster" title="Heated Coaster — Smart & Safe" bullets={[
          'USB‑PD → 24 V with safe negotiation',
          'Hall‑sensor triggered actuation',
          'On-board PID using tile thermistor',
          'Thermal run‑away protection',
          'ESP32 + Home Assistant integration'
        ]} />
        <Project href="/projects/esp32s3-led-bed" title="ESP32‑S3 LED Bed Controller" bullets={[
          'Neopixel control with power/ground planes',
          'Wi‑Fi control + Klipper firmware hooks',
          '4‑layer layout optimized for noise & heat'
        ]} />
        <Project href="/projects/rc-bms" title="RC Car Control & BMS Board" bullets={[
          'Battery management (BQ24075)',
          'Dual motor driver (e.g., DRV8833)',
          'ESP32 connectivity, CAN/USB comms',
          'Robust power path and protections'
        ]} />
        <Project title="RFID Filament Detection Concept" bullets={[
          'NFC/RFID reader integration',
          'Data model for spool tracking',
          'Security and encryption experiments'
        ]} />
      </div>
      <div className="mt-6">
        <a className="btn" href="mailto:hello@tes.swiss">Discuss your project</a>
      </div>
    </section>
  )
}
}
