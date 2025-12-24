import { getDictionary } from '../../i18n/getDictionary'
import AboutClient from './AboutClient'

export default async function AboutPage({ params: { locale } }) {
  const t = await getDictionary(locale)
  return <AboutClient key={locale} t={t} locale={locale} />
}
