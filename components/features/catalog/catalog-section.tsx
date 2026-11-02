import { Search } from 'lucide-react'
import type { Event } from '@/types'
import { Overline } from '@/components/common/overline'
import { SearchBar } from './search-bar'
import { FilterChips } from './filter-chips'
import { EventCard } from './event-card'

interface CatalogSectionProps {
  events: Event[]
  filters: string[]
  activeFilter: string
  onlySkpi: boolean
  query: string
  savedIds: string[]
  onQueryChange: (val: string) => void
  onClearQuery: () => void
  onChipClick: (item: string) => void
  onToggleSaved: (id: string) => void
  onExportICS: (event: Event) => void
  onShare: (event: Event) => void
  onSelectEvent: (event: Event) => void
}

export function CatalogSection({
  events,
  filters,
  activeFilter,
  onlySkpi,
  query,
  savedIds,
  onQueryChange,
  onClearQuery,
  onChipClick,
  onToggleSaved,
  onExportICS,
  onShare,
  onSelectEvent,
}: CatalogSectionProps) {
  const countDisplay = String(events.length).padStart(2, '0')

  return (
    <section className="catalog" id="catalog">
      <div className="section-heading">
        <div>
          <Overline>DIRECTORY / {countDisplay} RESULTS</Overline>
          <h2>Temukan ruang bertumbuh.</h2>
        </div>
        <p className="section-aside">
          Gunakan filter untuk menemukan
          <br />
          acara yang paling relevan.
        </p>
      </div>

      <SearchBar
        query={query}
        onQueryChange={onQueryChange}
        onClear={onClearQuery}
      />

      <FilterChips
        filters={filters}
        activeFilter={activeFilter}
        onlySkpi={onlySkpi}
        onChipClick={onChipClick}
      />

      <div className="event-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isSaved={savedIds.includes(event.id)}
            onToggleSaved={onToggleSaved}
            onExportICS={onExportICS}
            onShare={onShare}
            onSelect={onSelectEvent}
          />
        ))}
      </div>

      {events.length === 0 && (
        <div className="empty-state">
          <Search size={24} />
          <h3>Tidak ada acara yang cocok.</h3>
          <p>Coba kata kunci atau filter lain.</p>
        </div>
      )}
    </section>
  )
}

