import Link from 'next/link'
import Breadcrumb from '../../../components/Breadcrumb'

export const metadata = { title: 'Thermal & Power Safety — TES' }

export default function Page() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-3xl">
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/#what-we-do', label: 'What we do' }, { label: 'Thermal & Power Safety' }]} />
      <h1>Thermal & Power Safety</h1>
      <p>We ensure your designs operate safely and efficiently, with correct PD negotiation, protection circuits, and thermal safeguards.</p>
      <h2>We provide</h2>
      <ul>
        <li>USB-PD negotiation & compliance</li>
        <li>Over-voltage/over-current protection</li>
        <li>Thermal run-away detection</li>
        <li>Power path optimisation</li>
      </ul>
      <p><Link href="/#what-we-do">← Back to services</Link></p>
    </article>
  )
}
