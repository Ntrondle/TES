
import Link from 'next/link'

import Breadcrumb from '../../../components/Breadcrumb'

export const metadata = { title: 'Custom PCB Design — TES' }

export default function Page() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-3xl">
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/#what-we-do', label: 'What we do' }, { label: 'Custom PCB Design' }]} />
      <h1>Custom PCB Design</h1>
      <p>We create reliable, manufacturable PCBs optimised for performance, power delivery, and signal integrity. From 2 to 4+ layers, compact form factors, and careful component selection.</p>
      <h2>Our process</h2>
      {/*infographic*/}
      <div className="not-prose mt-4 grid sm:grid-cols-4 gap-3">
        {[
          {label:'Discover',desc:'Scope, constraints, success criteria'},
          {label:'Design',desc:'Schematic, layout, reviews'},
          {label:'Build',desc:'Fab/assembly, bring‑up, tests'},
          {label:'Deliver',desc:'Docs, BOM, Gerbers, firmware'}
        ].map((s, i) => (
          <div key={i} className="card card-accent p-4">
            <div className="text-sm text-neutral-500">{String(i+1).padStart(2,'0')}</div>
            <div className="font-semibold mt-1">{s.label}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">{s.desc}</div>
          </div>
        ))}
      </div>
      <ul>
        <li>Schematic design based on your requirements</li>
        <li>PCB layout with focus on thermal and EMI performance</li>
        <li>Gerber and manufacturing output</li>
        <li>Assembly guidance</li>
      </ul>
      <p><Link href="/#what-we-do">← Back to services</Link></p>

    </article>
  )
}
