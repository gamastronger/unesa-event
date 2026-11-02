import { WifiOff } from 'lucide-react'

interface OfflineBannerProps {
  show: boolean
}

export function OfflineBanner({ show }: OfflineBannerProps) {
  if (!show) return null

  return (
    <div className="offline-banner" role="status" aria-live="polite">
      <WifiOff size={15} /> Mode Luring Aktif — Menampilkan data dan berkas yang tersimpan di memori perangkat.
    </div>
  )
}

