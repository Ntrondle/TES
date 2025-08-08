import Link from 'next/link'
import {getDictionary} from '../../i18n/getDictionary'

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)

  return (
import Link from 'next/link'

import Breadcrumb from '../../../components/Breadcrumb'

export const metadata = { title: 'RC Car Control & BMS Board — TES' }


    <article className="prose prose-neutral dark:prose-invert max-w-3xl">
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/portfolio', label: 'Portfolio' }, { label: 'RC Car Control & BMS Board' }]} />
      <h1>RC Car Control & BMS Board</h1>
      <p>Battery management and dual motor control in a single board, featuring ESP32 connectivity, CAN/USB communications, and a robust protected power path.</p>
      <h2>Highlights</h2>
      <ul>
        <li>Battery management (BQ24075)</li>
        <li>Dual motor driver (e.g., DRV8833)</li>
        <li>ESP32 connectivity, CAN/USB comms</li>
        <li>Robust power path and protections</li>
      </ul>
      <p><Link href="/portfolio">{t.common.backToPortfolio}</Link></p>

    </article>
  )
}