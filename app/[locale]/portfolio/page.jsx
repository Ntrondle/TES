import { getPortfolioProjects } from '../../../lib/portfolio'
import PortfolioClient from './PortfolioClient'

export default async function PortfolioPage({ params: { locale } }) {
  const projects = await getPortfolioProjects()
  
  return <PortfolioClient projects={projects} locale={locale} />
}
