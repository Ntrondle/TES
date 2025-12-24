import { getDictionary } from '../i18n/getDictionary'
import HomeClient from './HomeClient'

export default async function HomePage({ params: { locale } }) {
  const t = await getDictionary(locale)
  return <HomeClient key={locale} t={t} locale={locale} />
}
