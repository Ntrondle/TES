import { getPortfolioProjects } from '../../../lib/portfolio'
import PortfolioClient from './PortfolioClient'
import { getDictionary } from '../../i18n/getDictionary'

export default async function PortfolioPage({ params: { locale } }) {
  const projects = await getPortfolioProjects(locale)
  const t = await getDictionary(locale)
  
  return <PortfolioClient key={locale} projects={projects} t={t} locale={locale} />
}
