import { ChevronRight } from 'lucide-react'
import type { Event } from '@/types'
import { Overline } from '@/components/common/overline'
import { FeaturedCard } from './featured-card'

interface ShowcaseSectionProps {
  events: Event[]
  onSelectEvent: (event: Event) => void
  onViewAllClick: () => void
}

export function ShowcaseSection({
  events,
  onSelectEvent,
  onViewAllClick,
}: ShowcaseSectionProps) {
  const featuredEvents = events.filter((event) => event.featured)

  return (
    <section className="showcase">
      <div className="section-heading">
        <div>
          <Overline>DISOROT MINGGU INI</Overline>
          <h2>Program yang sedang ramai.</h2>
        </div>
        <button className="text-button" onClick={onViewAllClick}>
          Lihat semua acara <ChevronRight size={16} />
        </button>
      </div>
      <div className="featured-grid">
        {featuredEvents.map((event) => (
          <FeaturedCard
            key={event.id}
            event={event}
            onSelect={onSelectEvent}
          />
        ))}
      </div>
    </section>
  )
}

