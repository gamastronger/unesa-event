import { Download, MoreHorizontal, WifiOff } from 'lucide-react'
import type { StorageStats } from '@/types'
import { formatSyncDate } from '@/lib/events-data'

interface StorageStatsCardProps {
  storageStats: StorageStats
  lastSync: string
  onResync: () => void
  onClear: () => void
}

export function StorageStatsCard({
  storageStats,
  lastSync,
  onResync,
  onClear,
}: StorageStatsCardProps) {
  return (
    <div className="storage-grid">
      <div className="storage-card storage-main">
        <div className="storage-top">
          <div>
            <span className="status-dot" />
            PWA STORAGE ACTIVE
          </div>
          <MoreHorizontal size={19} />
        </div>
        <strong>
          {storageStats.usageMB} <small>MB</small>
        </strong>
        <p>
          terpakai dari {storageStats.quotaMB} MB kuota lokal ({storageStats.percent}%)
        </p>
        <div className="progress">
          <span style={{ width: `${storageStats.percent}%` }} />
        </div>
        <div className="storage-actions">
          <button className="primary-button" onClick={onResync} type="button">
            <Download size={15} /> Sinkronkan Ulang
          </button>
          <button className="text-button" onClick={onClear} type="button">
            Bersihkan cache
          </button>
        </div>
      </div>

      <div className="storage-card cache-info">
        <WifiOff size={22} />
        <h3>Siap untuk luring</h3>
        <p>
          Semua acara tersimpan memiliki detail, rulebook, dan tautan pendaftaran
          yang dapat diakses tanpa koneksi.
        </p>
        <span>Terakhir sinkronisasi · {formatSyncDate(lastSync)}</span>
      </div>
    </div>
  )
}

