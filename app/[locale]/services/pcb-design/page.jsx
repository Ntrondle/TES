import { Cpu, ArrowRight, CheckCircle2, Layers, Zap, Shield } from 'lucide-react'
import { getDictionary } from '../../../i18n/getDictionary'
import PcbDesignClient from './PcbDesignClient'

export default async function PcbDesignPage({ params: { locale } }) {
  const t = await getDictionary(locale)

  const features = [
    {
      icon: <Layers className="w-5 h-5" />,
      title: t.servicePages.pcbDesign.features.multiLayer.title,
      description: t.servicePages.pcbDesign.features.multiLayer.description
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: t.servicePages.pcbDesign.features.powerIntegrity.title,
      description: t.servicePages.pcbDesign.features.powerIntegrity.description
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: t.servicePages.pcbDesign.features.signalIntegrity.title,
      description: t.servicePages.pcbDesign.features.signalIntegrity.description
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: t.servicePages.pcbDesign.features.manufacturingReady.title,
      description: t.servicePages.pcbDesign.features.manufacturingReady.description
    }
  ]

  const process = [
    {
      step: "01",
      title: t.servicePages.pcbDesign.process.requirements.title,
      description: t.servicePages.pcbDesign.process.requirements.description
    },
    {
      step: "02",
      title: t.servicePages.pcbDesign.process.schematic.title,
      description: t.servicePages.pcbDesign.process.schematic.description
    },
    {
      step: "03",
      title: t.servicePages.pcbDesign.process.layout.title,
      description: t.servicePages.pcbDesign.process.layout.description
    },
    {
      step: "04",
      title: t.servicePages.pcbDesign.process.review.title,
      description: t.servicePages.pcbDesign.process.review.description
    }
  ]

  const technologies = t.servicePages.pcbDesign.technologies

  return <PcbDesignClient key={locale} features={features} process={process} technologies={technologies} t={t} locale={locale} />
}
