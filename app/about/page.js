export const metadata = { title: 'About — TES' }

export default function Page() {
  return (
    <section className="max-w-3xl">
      <h1 className="text-4xl font-semibold tracking-tight">About TES</h1>
      <p className="mt-4">
        <strong>TES (Tröndle Embedded System)</strong> is a Swiss embedded design studio led by Nicolas Tröndle.
        We turn ideas into reliable hardware; combining PCB design, firmware, and practical testing.
      </p>
      <p className="mt-3">
        We’ve worked across ESP32, RP2040, and STM32 platforms; CAN, USB, and Wi‑Fi; and thermal/power‑aware designs.
        We care about clean schematics, manufacturable layouts, and robust software.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="card">
          <h3 className="font-semibold">Principles</h3>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Design for assembly and test</li>
            <li>Sane power budgets and protections</li>
            <li>Readable code and docs</li>
            <li>Iterate quickly, measure honestly</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold">Services</h3>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Schematic & layout</li>
            <li>Firmware & drivers</li>
            <li>Prototyping & bring-up</li>
            <li>Integration & documentation</li>
          </ul>
        </div>
      </div>
      <p className="mt-6 border-l-4 border-sky-500 pl-3 bg-sky-500/10 rounded">Based in Lausanne, working with teams across Switzerland and beyond.</p>
      <p className="mt-4"><a className="btn btn-primary" href="mailto:info@trondle.ch">Get in touch</a></p>
    </section>
  )
}
