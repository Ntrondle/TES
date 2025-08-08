

export default function Page() {
  return (
    <>
      <section className="py-8 relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <TracesBackground />

          </p>
          <div className="mt-6 flex gap-3">
            <a className="btn btn-primary" href="mailto:hello@tes.swiss">Start a project</a>
            <a className="btn" href="/portfolio">See work</a>
          </div>

        </div>
      </section>

      <section className="border-t border-neutral-200 dark:border-neutral-800 mt-10 pt-10">
        <h2 className="text-2xl font-semibold">What we do</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="card">
            <h3 className="text-lg font-semibold">Custom PCB design</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">4-layer and compact boards with solid power delivery and signal integrity. From schematic to ready-to-assemble Gerbers.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold">Firmware & integration</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">Drivers, control loops, and connectivity. From bare-metal to RTOS and Home Assistant integrations.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold">Thermal & power safety</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">PD negotiation, protections, run-away detection, and validated thermal behavior.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold">Rapid prototyping</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">Bring-up, fixtures, test scripts, and iteration until it’s shippable.</p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Selected highlights</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <article className="card">
            <h3 className="font-semibold">Smart heated coaster</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">USB‑PD, hall-sensor actuation, PID via ESP32, thermal run‑away protection, Home Assistant.</p>
          </article>
          <article className="card">
            <h3 className="font-semibold">ESP32‑S3 LED/bed controller</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">Neopixel control with isolated planes, Wi‑Fi, Klipper integration.</p>
          </article>
          <article className="card">
            <h3 className="font-semibold">RC module & BMS</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">Integrated BMS, dual motor control, robust CAN/USB comms.</p>
          </article>
        </div>
      </section>
    </>
  )
}
