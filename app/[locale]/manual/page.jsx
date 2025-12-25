import { getDictionary } from '../../i18n/getDictionary'
import { getManuals } from '../../../lib/manuals'
import ManualClient from './ManualClient'

export default async function ManualPage({ params: { locale } }) {
  const t = await getDictionary(locale)
  const manuals = await getManuals(locale)
  return <ManualClient key={locale} t={t} locale={locale} manuals={manuals} />
}