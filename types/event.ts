import type { ComponentType } from 'react'

export interface Event {
  id: string
  title: string
  category: string
  organizer: string
  date: string
  deadline: string
  fee: string
  format: string
  prize: string
  poster: string
  tone: string
  featured?: boolean
  team?: boolean
  free?: boolean
  scope: string
  eligibility: string[]
  skpi: string
}

export type ViewType = 'catalog' | 'offline' | 'calendar' | 'guide'

export interface StorageStats {
  usageMB: number
  quotaMB: number
  percent: number
}

export interface NavItem {
  id: ViewType
  label: string
  icon: ComponentType<{ size?: number; className?: string }>
}
