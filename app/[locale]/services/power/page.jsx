import { Zap, Battery, Thermometer, Shield } from 'lucide-react'
import { getDictionary } from '../../../i18n/getDictionary'
import PowerClient from './PowerClient'

export default async function PowerPage({ params: { locale } }) {
  const t = await getDictionary(locale)

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: t.servicePages.power.features.powerConversion.title,
      description: t.servicePages.power.features.powerConversion.description
    },
    {
      icon: <Battery className="w-5 h-5" />,
      title: t.servicePages.power.features.batteryManagement.title,
      description: t.servicePages.power.features.batteryManagement.description
    },
    {
      icon: <Thermometer className="w-5 h-5" />,
      title: t.servicePages.power.features.thermalDesign.title,
      description: t.servicePages.power.features.thermalDesign.description
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: t.servicePages.power.features.protection.title,
      description: t.servicePages.power.features.protection.description
    }
  ]

  return <PowerClient key={locale} features={features} t={t} locale={locale} />
}
