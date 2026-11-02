import { ArrowUpRight, FileText } from 'lucide-react'
import { Overline } from '@/components/common/overline'
import { offlineRulebookFiles } from '@/lib/events-data'

export function RulebookFiles() {
  return (
    <div className="subpage-section">
      <div className="section-heading">
        <div>
          <Overline>DOWNLOADED FILES / 03 PDF</Overline>
          <h2>Rak rulebook.</h2>
        </div>
      </div>
      <div className="file-grid">
        {offlineRulebookFiles.map((file) => (
          <div className="file-tile" key={file.name}>
            <FileText size={22} />
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.size} · {file.date}
              </span>
            </div>
            <button aria-label={`Buka ${file.name}`} type="button">
              <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

