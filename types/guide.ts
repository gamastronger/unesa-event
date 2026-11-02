import type { ComponentType } from 'react'

export type GuidePlatform = 'android' | 'ios'

export interface GuideStep {
  number: string
  title: string
  description: string
}

export interface GuideResource {
  title: string
  meta: string
  icon: ComponentType<{ size?: number; className?: string }>
}

