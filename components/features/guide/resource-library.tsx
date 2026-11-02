import { Download } from 'lucide-react'
import { Overline } from '@/components/common/overline'
import { guideResources } from '@/lib/events-data'

export function ResourceLibrary() {
  return (
    <section className="guide-section resource-section">
      <div className="section-heading">
        <div>
          <Overline>RESOURCE LIBRARY</Overline>
          <h2>Mulai dari fondasi yang benar.</h2>
        </div>
      </div>
      <div className="resource-grid">
        {guideResources.map(({ title, meta, icon: Icon }) => (
          <button className="resource-tile" key={title} type="button">
            <Icon size={22} />
            <div>
              <strong>{title}</strong>
              <span>{meta}</span>
            </div>
            <Download size={16} />
          </button>
        ))}
      </div>
    </section>
  )
}

