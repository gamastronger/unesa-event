import type { Event } from '@/types/event'

interface PosterProps {
  event: Event
  large?: boolean
}

export function Poster({ event, large = false }: PosterProps) {
  return (
    <div className={`poster poster-${event.tone} ${large ? 'poster-large' : ''}`}>
      <div className="poster-grid" />
      <div className="poster-word">
        {event.poster.split('\n').map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className="poster-mark">
        UNESA<br />
        <small>EVENT HUB</small>
      </div>
    </div>
  )
}
