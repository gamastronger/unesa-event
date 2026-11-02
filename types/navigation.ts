import type { ComponentType } from 'react'

export type ViewType = 'catalog' | 'offline' | 'calendar' | 'guide'

export interface NavItem {
  id: ViewType
  label: string
  icon: ComponentType<{ size?: number; className?: string }>
}

