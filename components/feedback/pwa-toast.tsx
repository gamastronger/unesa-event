import { Check } from 'lucide-react'

interface PwaToastProps {
  message: string | null
}

export function PwaToast({ message }: PwaToastProps) {
  if (!message) return null

  return (
    <div className="pwa-toast" role="status" aria-live="polite">
      <span className="pwa-toast-icon">
        <Check size={16} />
      </span>
      <span>{message}</span>
    </div>
  )
}

