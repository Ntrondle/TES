import Breadcrumb from '../../../components/Breadcrumb'

export const metadata = { title: 'Smart Heated Coaster — TES' }

export default function Page() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-3xl">
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/portfolio', label: 'Portfolio' }, { label: 'Smart Heated Coaster' }]} />
      <h1>Smart Heated Coaster</h1>
      <p>USB-PD power with safe negotiation to 24 V, hall-sensor triggered actuation, on-board PID using the tile’s thermistor, thermal run-away protection, and ESP32 + Home Assistant integration.</p>
      <h2>Highlights</h2>
      <ul>
        <li>USB-PD trigger to 24 V (negotiation + protections)</li>
        <li>Magnetic suspension + hall sensor to detect load</li>
        <li>PID loop on-board; failsafes & temp limits</li>
        <li>Firmware OTA + Home Assistant hooks</li>
      </ul>
      <p><a href="/portfolio">← Back to portfolio</a></p>
    </article>
  )
}
