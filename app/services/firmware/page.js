import Link from 'next/link'
import Breadcrumb from '../../../components/Breadcrumb'

export const metadata = { title: 'Firmware & Integration — TES' }

export default function Page() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-3xl">
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/#what-we-do', label: 'What we do' }, { label: 'Firmware & Integration' }]} />
      <h1>Firmware & Integration</h1>
      <p>From bare-metal drivers to RTOS-based apps, we deliver firmware optimised for performance and reliability. We also handle integrations with systems like Home Assistant.</p>
      <h2>Capabilities</h2>
      <ul>
        <li>Low-level driver development</li>
        <li>Control loops & signal processing</li>
        <li>Wireless connectivity (Wi-Fi, BLE)</li>
        <li>Integration into existing ecosystems</li>
      </ul>
      <p><Link href="/#what-we-do">← Back to services</Link></p>
    </article>
  )
}
