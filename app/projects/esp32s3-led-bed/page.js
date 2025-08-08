import Link from 'next/link'
import {getDictionary} from '../../i18n/getDictionary'

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)

  return (
import Link from 'next/link'

import Breadcrumb from '../../../components/Breadcrumb'

export const metadata = { title: 'ESP32-S3 LED Bed Controller — TES' }


    <article className="prose prose-neutral dark:prose-invert max-w-3xl">
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/portfolio', label: 'Portfolio' }, { label: 'ESP32-S3 LED Bed Controller' }]} />
      <h1>ESP32-S3 LED Bed Controller</h1>
      <p>Neopixel control and Wi-Fi connectivity for LED-lit beds, with Klipper firmware hooks and a four-layer layout optimised for noise and thermal performance.</p>
      <h2>Highlights</h2>
      <ul>
        <li>Neopixel control with power/ground planes</li>
        <li>Wi-Fi control + Klipper firmware hooks</li>
        <li>4-layer layout optimized for noise & heat</li>
      </ul>
      <p><Link href="/portfolio">{t.common.backToPortfolio}</Link></p>

    </article>
  )
}