import { ChevronRight } from 'lucide-react'
import type { Event, TimelineItem as TimelineItemType } from '@/types'

interface TimelineCardProps {
  item: TimelineItemType
  event: Event
  onSelect: (event: Event) => void
}

export function TimelineCard({ item, event, onSelect }: TimelineCardProps) {
  return (
    <div className="timeline-item">
      <div className="timeline-date">{item.day}</div>
      <div className={`timeline-line ${item.tone}`} />
      <button
        className="timeline-card"
        onClick={() => onSelect(event)}
        type="button"
        aria-label={`Lihat detail jadwal ${item.title}`}
      >
        <div className="timeline-card-content">
          <span className="timeline-card-phase">{item.phase}</span>
          <h3 className="timeline-card-title">{item.title}</h3>
        </div>
        <ChevronRight size={17} />
      </button>
    </div>
  )
}

