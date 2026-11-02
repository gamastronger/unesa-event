import type { ReactNode } from 'react'

interface OverlineProps {
  children: ReactNode
}

export function Overline({ children }: OverlineProps) {
  return (
    <p className="overline">
      <span />
      {children}
    </p>
  )
}
