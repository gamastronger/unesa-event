import { Check, Download, ExternalLink, X } from 'lucide-react'
import type { Event } from '@/types'
import { BookmarkIcon } from '@/components/common/bookmark-icon'
import { Overline } from '@/components/common/overline'
import { Poster } from '@/components/common/poster'
import { isSkpiValid } from '@/lib/events-data'

interface EventDetailModalProps {
  event: Event | null
  isSaved: boolean
  onClose: () => void
  onToggleSaved: (id: string) => void
}

export function EventDetailModal({
  event,
  isSaved,
  onClose,
  onToggleSaved,
}: EventDetailModalProps) {
  if (!event) return null

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-label={event.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-drag-indicator" aria-hidden="true" />
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Tutup detail"
        >
          <X size={18} />
        </button>

        <div className="detail-poster">
          <Poster event={event} large />
          <button className="outline-button" type="button">
            <Download size={15} /> Unduh Rulebook PDF
          </button>
        </div>

        <div className="detail-copy">
          <Overline>{event.category} / DETAIL ACARA</Overline>
          <h2>{event.title}</h2>
          <p className="detail-scope">{event.scope}</p>

          <div className="detail-stats">
            <div>
              <span>Tanggal pelaksanaan</span>
              <strong>{event.date}</strong>
            </div>
            <div>
              <span>Biaya registrasi</span>
              <strong>{event.fee}</strong>
            </div>
            <div>
              <span>Format kegiatan</span>
              <strong>{event.format}</strong>
            </div>
            <div>
              <span>Poin SKPI</span>
              <strong className={isSkpiValid(event) ? 'skpi-stat' : ''}>
                {event.skpi}
              </strong>
            </div>
            <div>
              <span>Total apresiasi</span>
              <strong>{event.prize}</strong>
            </div>
            <div>
              <span>Penyelenggara</span>
              <strong>{event.organizer}</strong>
            </div>
          </div>

          <h4>Persyaratan utama</h4>
          <ul>
            {event.eligibility.map((item) => (
              <li key={item}>
                <Check size={16} />
                {item}
              </li>
            ))}
          </ul>

          <div className="detail-footer">
            <div className="detail-actions-row">
              <button className="primary-button full-width" type="button">
                Daftar di Portal Resmi <ExternalLink size={16} />
              </button>
              <button
                className={`modal-save-btn ${isSaved ? 'saved' : ''}`}
                onClick={() => onToggleSaved(event.id)}
                aria-label={isSaved ? 'Hapus dari offline' : 'Simpan offline'}
                type="button"
              >
                <BookmarkIcon filled={isSaved} />
                {isSaved ? 'Tersimpan' : 'Simpan Offline'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

