import Link from 'next/link'
import {locales} from '../i18n/locales'

export default function LangSwitcher({ locale, className = '' }) {
  return (
    <div className={className}>
      {locales.map((l, i) => (
        <Link key={l} href={`/${l}`} className={`nav-link ${l===locale?'font-semibold':''}`}>
          {l.toUpperCase()}{i < locales.length-1 ? ' · ' : ''}
        </Link>
      ))}
    </div>
  )
}
