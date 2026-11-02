import { ArrowUpRight, X } from 'lucide-react'
import type { Event } from '@/types'
import { Poster } from '@/components/common/poster'

interface SavedEventItemProps {
  event: Event
  onSelect: (event: Event) => void
  onRemove: (id: string) => void
}

export function SavedEventItem({
  event,
  onSelect,
  onRemove,
}: SavedEventItemProps) {
  return (
    <div className="saved-item">
      <div className="saved-poster-wrapper">
        <Poster event={event} />
      </div>
      <div className="saved-item-info">
        <span className="ready-badge">● Tersedia Tanpa Internet</span>
        <h3>{event.title}</h3>
        <p>
          {event.organizer} · {event.date}
        </p>
      </div>
      <div className="saved-item-actions">
        <button
          onClick={() => onSelect(event)}
          className="text-button"
          type="button"
        >
          Buka detail <ArrowUpRight size={15} />
        </button>
        <button
          onClick={() => onRemove(event.id)}
          className="remove-button"
          aria-label={`Hapus ${event.title}`}
          title="Hapus dari offline"
          type="button"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  )
}

