import { ArrowUpRight, CalendarDays, Share2, Sparkles, Users } from 'lucide-react'
import type { Event } from '@/types'
import { BookmarkIcon } from '@/components/common/bookmark-icon'
import { Poster } from '@/components/common/poster'
import { isSkpiValid } from '@/lib/events-data'

interface EventCardProps {
  event: Event
  isSaved: boolean
  onToggleSaved: (id: string) => void
  onExportICS: (event: Event) => void
  onShare: (event: Event) => void
  onSelect: (event: Event) => void
}

export function EventCard({
  event,
  isSaved,
  onToggleSaved,
  onExportICS,
  onShare,
  onSelect,
}: EventCardProps) {
  return (
    <article className="event-card">
      <button
        className="card-poster-button"
        onClick={() => onSelect(event)}
        aria-label={`Lihat detail ${event.title}`}
      >
        <Poster event={event} />
        <span className="deadline-badge">{event.deadline}</span>
      </button>

      <div className="event-body">
        <div className="event-tags-row">
          <span className="category-label">{event.category}</span>
          {isSkpiValid(event) && (
            <span className="skpi-badge" title="Poin SKPI Terverifikasi">
              ⭐ {event.skpi}
            </span>
          )}
        </div>

        <h3>{event.title}</h3>
        <p className="organizer">{event.organizer}</p>

        <div className="event-meta">
          <span>
            <CalendarDays size={14} />
            {event.date}
          </span>
          <span>
            <Users size={14} />
            {event.format}
          </span>
          <span>
            <Sparkles size={14} />
            {event.fee}
          </span>
        </div>

        <div className="event-actions">
          <button
            onClick={() => onToggleSaved(event.id)}
            className={isSaved ? 'saved' : ''}
            type="button"
          >
            <BookmarkIcon filled={isSaved} />
            {isSaved ? 'Tersimpan' : 'Simpan Offline'}
          </button>
          <button
            onClick={() => onExportICS(event)}
            aria-label="Export kalender"
            type="button"
          >
            <CalendarDays size={15} />
            .ICS
          </button>
          <button
            onClick={() => onShare(event)}
            aria-label="Bagikan acara"
            type="button"
          >
            <Share2 size={15} />
          </button>
          <button
            className="detail-link"
            onClick={() => onSelect(event)}
            type="button"
          >
            Detail <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}

