import { CalendarDays } from 'lucide-react'
import type { Event } from '@/types'
import { Overline } from '@/components/common/overline'
import { events, timelineEvents } from '@/lib/events-data'
import { DeadlineMetricsCard } from './deadline-metrics-card'
import { TimelineCard } from './timeline-item'

interface CalendarViewProps {
  onExportICS: () => void
  onSelectEvent: (event: Event) => void
}

export function CalendarView({ onExportICS, onSelectEvent }: CalendarViewProps) {
  return (
    <main className="subpage">
      <div className="subpage-intro split-intro">
        <div>
          <Overline>TIMELINE / DEADLINE RADAR</Overline>
          <h1>
            Kalender <em>kegiatan.</em>
          </h1>
          <p>
            Jangan biarkan peluang lewat begitu saja. Semua tanggal penting, dalam satu
            pandangan.
          </p>
        </div>
        <button className="primary-button" onClick={onExportICS} type="button">
          <CalendarDays size={16} /> Sinkronisasi .ICS
        </button>
      </div>

      <DeadlineMetricsCard />

      <div className="timeline">
        {timelineEvents.map((item) => {
          const matchedEvent =
            events.find((event) => event.title === item.title) ?? events[0]

          return (
            <TimelineCard
              key={item.title}
              item={item}
              event={matchedEvent}
              onSelect={onSelectEvent}
            />
          )
        })}
      </div>
    </main>
  )
}

