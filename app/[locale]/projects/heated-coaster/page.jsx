import Link from 'next/link'
import { getDictionary } from '../../../i18n/getDictionary'

export async function generateMetadata({ params }) {
  return {
    title: 'Heated Coaster — Smart & Safe',
    description: 'USB-PD to 24 V with safe negotiation, thermal control, and fail-safes.'
  }
}

export default async function Page({ params }) {
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)

  return (
    <article className="max-w-3xl">
      <p className="mb-4">
        <Link href={`/${locale}/portfolio`} className="nav-link">
          {t.common.backToPortfolio}
        </Link>
      </p>
      
      <h1 className="text-3xl font-semibold tracking-tight mb-4">Heated Coaster — Smart & Safe</h1>
      
      <p className="mt-3 text-neutral-600 dark:text-neutral-300 mb-6">USB-PD to 24 V with safe negotiation, thermal control, and fail-safes.</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>A sophisticated heated coaster that leverages USB Power Delivery for safe, efficient heating. This project demonstrates advanced power negotiation, precise thermal control, and comprehensive safety systems in a compact consumer-friendly package.</p>

        <h2>Design Philosophy</h2>
        <p>Safety and efficiency drive every design decision in this project. Rather than using simple resistance heating, we implemented intelligent thermal management with multiple fail-safes to ensure user safety and optimal performance.</p>

        <h2>Key Features</h2>
        <ul>
          <li><strong>Smart Power Negotiation:</strong> Automatic USB-PD negotiation up to 65W</li>
          <li><strong>Precise Temperature Control:</strong> ±1°C accuracy with PID control</li>
          <li><strong>Multiple Safety Systems:</strong> Thermal runaway protection, overcurrent detection</li>
          <li><strong>User-Friendly Interface:</strong> Single-button operation with LED status indicators</li>
          <li><strong>Universal Compatibility:</strong> Works with any USB-PD charger 45W or higher</li>
        </ul>

        <h2>Technical Implementation</h2>
        <h3>Power Management</h3>
        <p>The heart of the system is a custom USB-PD controller that safely negotiates power delivery:</p>
        <ul>
          <li><strong>Input Range:</strong> 5V to 20V via USB-PD negotiation</li>
          <li><strong>Power Conversion:</strong> Efficient buck converter to 24V heating rail</li>
          <li><strong>Current Monitoring:</strong> Real-time current sensing with hardware cutoff</li>
          <li><strong>Thermal Protection:</strong> Multiple temperature sensors with redundancy</li>
        </ul>

        <h3>Control System</h3>
        <p>Advanced control algorithms ensure consistent heating performance:</p>
        <ul>
          <li><strong>PID Temperature Control:</strong> Smooth temperature regulation without overshoot</li>
          <li><strong>Adaptive Learning:</strong> System learns thermal characteristics of different cup materials</li>
          <li><strong>Safety Monitoring:</strong> Continuous monitoring of all critical parameters</li>
          <li><strong>Fault Recovery:</strong> Automatic recovery from transient fault conditions</li>
        </ul>

        <h2>Safety Features</h2>
        <h3>Multi-Layer Protection</h3>
        <ul>
          <li><strong>Hardware Thermal Cutoff:</strong> Independent thermal switch at 85°C</li>
          <li><strong>Software Temperature Limits:</strong> Programmable limits with hysteresis</li>
          <li><strong>Current Limiting:</strong> Hardware overcurrent protection at 4A</li>
          <li><strong>Timeout Protection:</strong> Automatic shutoff after 2 hours of operation</li>
        </ul>

        <h3>User Safety</h3>
        <ul>
          <li><strong>Cool-Touch Surface:</strong> Insulated design prevents accidental burns</li>
          <li><strong>Stable Base:</strong> Non-slip bottom with heat-resistant materials</li>
          <li><strong>Visual Indicators:</strong> Clear LED status for heating/standby/fault states</li>
          <li><strong>Auto-Shutoff:</strong> Detects cup removal and powers down automatically</li>
        </ul>

        <h2>Performance Specifications</h2>
        <ul>
          <li><strong>Heating Range:</strong> 40°C to 75°C (user selectable)</li>
          <li><strong>Heat-Up Time:</strong> 60 seconds to target temperature</li>
          <li><strong>Temperature Accuracy:</strong> ±1°C steady-state</li>
          <li><strong>Power Efficiency:</strong> Greater than 90% power conversion efficiency</li>
          <li><strong>Operating Life:</strong> Greater than 10,000 heat cycles tested</li>
          <li><strong>Ambient Range:</strong> 0°C to 40°C ambient operation</li>
        </ul>

        <h2>Testing & Validation</h2>
        <p>Comprehensive testing ensures reliability and safety:</p>
        <ul>
          <li><strong>Thermal Cycling:</strong> 1000+ cycles at maximum temperature</li>
          <li><strong>Drop Testing:</strong> Survives 1m drops onto hard surfaces</li>
          <li><strong>Electrical Safety:</strong> UL-equivalent electrical safety testing</li>
          <li><strong>EMC Testing:</strong> Passes consumer electronics EMC requirements</li>
          <li><strong>Long-term Testing:</strong> 500+ hour continuous operation validation</li>
        </ul>

        <p>This project showcases how proper engineering can make everyday products both smarter and safer.</p>
      </div>
    </article>
  )
}