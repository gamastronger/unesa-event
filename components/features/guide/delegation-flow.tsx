import { Overline } from '@/components/common/overline'
import { guideSteps } from '@/lib/events-data'

export function DelegationFlow() {
  return (
    <section className="guide-section">
      <div className="section-heading">
        <div>
          <Overline>DELEGATION FLOW</Overline>
          <h2>Empat langkah, satu arah.</h2>
        </div>
      </div>
      <div className="stepper">
        {guideSteps.map((step) => (
          <div className="step" key={step.number}>
            <div className="step-header">
              <span className="step-number">{step.number}</span>
              <span className="step-tag">Tahap {step.number}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

