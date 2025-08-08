import Breadcrumb from '../../../components/Breadcrumb'

export const metadata = { title: 'Custom PCB Design — TES' }

export default function Page() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-3xl">
      <Breadcrumb items={[{ href: '/', label: 'Home' }, { href: '/#what-we-do', label: 'What we do' }, { label: 'Custom PCB Design' }]} />
      <h1>Custom PCB Design</h1>
      <p>We create reliable, manufacturable PCBs optimised for performance, power delivery, and signal integrity. From 2 to 4+ layers, compact form factors, and careful component selection.</p>
      <h2>Our process</h2>
      <ul>
        <li>Schematic design based on your requirements</li>
        <li>PCB layout with focus on thermal and EMI performance</li>
        <li>Gerber and manufacturing output</li>
        <li>Assembly guidance</li>
      </ul>
      <p><a href="/#what-we-do">← Back to services</a></p>
    </article>
  )
}
