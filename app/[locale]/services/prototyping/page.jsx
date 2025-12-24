import { Wrench, Search, Settings, ClipboardCheck } from 'lucide-react'
import { getDictionary } from '../../../i18n/getDictionary'
import PrototypingClient from './PrototypingClient'

export default async function PrototypingPage({ params: { locale } }) {
  const t = await getDictionary(locale)

  const services = [
    {
      icon: <Settings className="w-5 h-5" />,
      title: t.servicePages.prototyping.services.boardBringup.title,
      description: t.servicePages.prototyping.services.boardBringup.description
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: t.servicePages.prototyping.services.debugging.title,
      description: t.servicePages.prototyping.services.debugging.description
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: t.servicePages.prototyping.services.testJigs.title,
      description: t.servicePages.prototyping.services.testJigs.description
    },
    {
      icon: <ClipboardCheck className="w-5 h-5" />,
      title: t.servicePages.prototyping.services.validation.title,
      description: t.servicePages.prototyping.services.validation.description
    }
  ]

  return <PrototypingClient key={locale} services={services} t={t} locale={locale} />
}
