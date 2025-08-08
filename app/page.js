

import Link from 'next/link'
import TracesBackground from '../components/TracesBackground'

export default function Page() {
  return (
    <>
      <section className="py-8 relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <TracesBackground />

        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Embedded systems, built right.</h1>
          <p className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-300">
            We design and ship custom electronics: PCB design, firmware, and connected products. From idea to tested prototypes.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="btn btn-primary" href="mailto:hello@tes.swiss">Start a project</a>
            <Link className="btn" href="/portfolio">See work</Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2 text-sm text-neutral-500">
            <li className="px-3 py-1 border border-neutral-200 dark:border-neutral-800 rounded-full">PCB design (ESP32, STM32, RP2040)</li>
            <li className="px-3 py-1 border border-neutral-200 dark:border-neutral-800 rounded-full">Firmware (C/C++, Klipper, ESP-IDF)</li>
            <li className="px-3 py-1 border border-neutral-200 dark:border-neutral-800 rounded-full">Power & thermal design</li>
            <li className="px-3 py-1 border border-neutral-200 dark:border-neutral-800 rounded-full">Connectivity (Wi‑Fi, BLE, USB, CAN)</li>
            <li className="px-3 py-1 border border-neutral-200 dark:border-neutral-800 rounded-full">Prototyping & test</li>
          </ul>

        </div>
      </section>

      <section id="what-we-do" className="border-t border-neutral-200 dark:border-neutral-800 mt-10 pt-10">
        <h2 className="text-2xl font-semibold">What we do</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4">

          <Link className="card" href="/services/pcb-design">
            <h3 className="text-lg font-semibold">Custom PCB design</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">4-layer and compact boards with solid power delivery and signal integrity. From schematic to ready-to-assemble Gerbers.</p>
          </Link>
          <Link className="card" href="/services/firmware">
            <h3 className="text-lg font-semibold">Firmware & integration</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">Drivers, control loops, and connectivity. From bare-metal to RTOS and Home Assistant integrations.</p>
          </Link>
          <Link className="card" href="/services/power">
            <h3 className="text-lg font-semibold">Thermal & power safety</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">PD negotiation, protections, run-away detection, and validated thermal behavior.</p>
          </Link>
          <Link className="card" href="/services/prototyping">
            <h3 className="text-lg font-semibold">Rapid prototyping</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">Bring-up, fixtures, test scripts, and iteration until it’s shippable.</p>
          </Link>

        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Selected highlights</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">

          <Link className="card" href="/projects/heated-coaster">
            <h3 className="font-semibold">Smart heated coaster</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">USB‑PD, hall-sensor actuation, PID via ESP32, thermal run‑away protection, Home Assistant.</p>
          </Link>
          <Link className="card" href="/projects/esp32s3-led-bed">
            <h3 className="font-semibold">ESP32‑S3 LED/bed controller</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">Neopixel control with isolated planes, Wi‑Fi, Klipper integration.</p>
          </Link>
          <Link className="card" href="/projects/rc-bms">
            <h3 className="font-semibold">RC module & BMS</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">Integrated BMS, dual motor control, robust CAN/USB comms.</p>
          </Link>

        </div>
      </section>
    </>
  )
}
