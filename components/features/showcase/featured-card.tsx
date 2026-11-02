import { ArrowUpRight } from 'lucide-react'
import type { Event } from '@/types'
import { Poster } from '@/components/common/poster'

interface FeaturedCardProps {
  event: Event
  onSelect: (event: Event) => void
}

export function FeaturedCard({ event, onSelect }: FeaturedCardProps) {
  return (
    <button
      className="featured-card"
      onClick={() => onSelect(event)}
      aria-label={`Lihat detail unggulan: ${event.title}`}
    >
      <Poster event={event} large />
      <div className="featured-copy">
        <span>{event.category}</span>
        <h3>{event.title}</h3>
        <p>{event.scope}</p>
        <span className="arrow-circle">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </button>
  )
}

