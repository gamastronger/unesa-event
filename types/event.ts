export type EventTone = 'blue' | 'ink' | 'coral' | 'mint' | 'yellow' | 'purple'

export type EventCategory =
  | 'Karya Tulis Ilmiah'
  | 'Teknologi & Coding'
  | 'Webinar & Seminar'
  | 'Workshop'
  | 'Seni & Desain'
  | 'Olimpiade & Sains'
  | string

export interface Event {
  id: string
  title: string
  category: EventCategory
  organizer: string
  date: string
  deadline: string
  fee: string
  format: string
  prize: string
  poster: string
  tone: EventTone | string
  featured?: boolean
  team?: boolean
  free?: boolean
  scope: string
  eligibility: string[]
  skpi: string
}
