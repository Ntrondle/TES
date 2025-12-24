import { getDictionary } from '../../i18n/getDictionary'
import ManualClient from './ManualClient'

export default async function ManualPage({ params: { locale } }) {
  const t = await getDictionary(locale)
  return <ManualClient key={locale} t={t} locale={locale} />
}
