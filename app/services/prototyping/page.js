import Link from 'next/link'
import Breadcrumb from '../../../components/Breadcrumb'

export const metadata = { title: 'Rapid Prototyping — TES' }

export default function Page() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-3xl">
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/#what-we-do', label: 'What we do' }, { label: 'Rapid Prototyping' }]} />
      <h1>Rapid Prototyping</h1>
      <p>We turn ideas into tested prototypes quickly, reducing your time to market and allowing faster iteration.</p>
      <h2>Approach</h2>
      <ul>
        <li>Fast PCB fabrication & assembly</li>
        <li>Fixture & jig creation</li>
        <li>Firmware bring-up</li>
        <li>Iterative refinement</li>
      </ul>
      <p><Link href="/#what-we-do">← Back to services</Link></p>
    </article>
  )
}
