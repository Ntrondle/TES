import { Code, Bluetooth, Wifi, HardDrive, Terminal } from 'lucide-react'
import { getDictionary } from '../../../i18n/getDictionary'
import FirmwareClient from './FirmwareClient'

export default async function FirmwarePage({ params: { locale } }) {
  const t = await getDictionary(locale)

  const features = [
    {
      icon: <Code className="w-5 h-5" />,
      title: t.servicePages.firmware.features.embeddedCpp.title,
      description: t.servicePages.firmware.features.embeddedCpp.description
    },
    {
      icon: <Bluetooth className="w-5 h-5" />,
      title: t.servicePages.firmware.features.wireless.title,
      description: t.servicePages.firmware.features.wireless.description
    },
    {
      icon: <HardDrive className="w-5 h-5" />,
      title: t.servicePages.firmware.features.storage.title,
      description: t.servicePages.firmware.features.storage.description
    },
    {
      icon: <Terminal className="w-5 h-5" />,
      title: t.servicePages.firmware.features.protocols.title,
      description: t.servicePages.firmware.features.protocols.description
    }
  ]

  const platforms = [
    { name: t.servicePages.firmware.platforms.esp32.name, description: t.servicePages.firmware.platforms.esp32.description },
    { name: t.servicePages.firmware.platforms.rp2040.name, description: t.servicePages.firmware.platforms.rp2040.description },
    { name: t.servicePages.firmware.platforms.stm32.name, description: t.servicePages.firmware.platforms.stm32.description },
    { name: t.servicePages.firmware.platforms.nordic.name, description: t.servicePages.firmware.platforms.nordic.description }
  ]

  return <FirmwareClient key={locale} features={features} platforms={platforms} t={t} locale={locale} />
}
