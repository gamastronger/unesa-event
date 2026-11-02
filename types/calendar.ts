export type TimelineTone = 'deadline' | 'review' | 'announce'

export interface TimelineItem {
  day: string
  phase: string
  title: string
  tone: TimelineTone
}

export interface DeadlineMetric {
  label: string
  count: string
  unit: string
}

