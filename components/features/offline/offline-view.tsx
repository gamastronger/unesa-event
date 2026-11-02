import { ChevronRight, HardDriveDownload } from 'lucide-react'
import type { Event, StorageStats, ViewType } from '@/types'
import { Overline } from '@/components/common/overline'
import { events } from '@/lib/events-data'
import { StorageStatsCard } from './storage-stats-card'
import { SavedEventItem } from './saved-event-item'
import { RulebookFiles } from './rulebook-files'

interface OfflineViewProps {
  saved: string[]
  toggleSaved: (id: string) => void
  setView: (view: ViewType) => void
  setSelected: (event: Event) => void
  storageStats: StorageStats
  lastSync: string
  resyncOfflineStorage: () => void
  clearOfflineStorage: () => void
}

export function OfflineView({
  saved,
  toggleSaved,
  setView,
  setSelected,
  storageStats,
  lastSync,
  resyncOfflineStorage,
  clearOfflineStorage,
}: OfflineViewProps) {
  const savedEvents = events.filter((event) => saved.includes(event.id))
  const countDisplay = String(savedEvents.length).padStart(2, '0')

  return (
    <main className="subpage">
      <div className="subpage-intro">
        <Overline>STORAGE / LOCAL PERSISTENCE</Overline>
        <h1>
          Disimpan <em>offline.</em>
        </h1>
        <p>
          Acara dan berkas penting yang tetap tersedia saat koneksi sedang tidak bersahabat.
        </p>
      </div>

      <StorageStatsCard
        storageStats={storageStats}
        lastSync={lastSync}
        onResync={resyncOfflineStorage}
        onClear={clearOfflineStorage}
      />

      <div className="subpage-section">
        <div className="section-heading">
          <div>
            <Overline>MY COLLECTION / {countDisplay} ITEMS</Overline>
            <h2>Kompetisi pilihanmu.</h2>
          </div>
          <button className="text-button" onClick={() => setView('catalog')} type="button">
            Tambah acara <ChevronRight size={16} />
          </button>
        </div>

        <div className="saved-list">
          {savedEvents.map((event) => (
            <SavedEventItem
              key={event.id}
              event={event}
              onSelect={setSelected}
              onRemove={toggleSaved}
            />
          ))}

          {savedEvents.length === 0 && (
            <div className="empty-state">
              <HardDriveDownload size={24} />
              <h3>Belum ada acara yang disimpan offline.</h3>
              <p>Simpan acara dari katalog agar dapat diakses kapan saja.</p>
            </div>
          )}
        </div>
      </div>

      <RulebookFiles />
    </main>
  )
}

