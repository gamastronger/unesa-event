import { ShieldCheck } from 'lucide-react'
import { Overline } from '@/components/common/overline'

export function MetricsSection() {
  return (
    <section className="metrics">
      <div>
        <Overline>EVENT TERVERIFIKASI</Overline>
        <strong>
          150<span>+</span>
        </strong>
        <p>acara aktif dan terkurasi</p>
      </div>
      <div>
        <Overline>TOTAL HIBAH & APRESIASI</Overline>
        <strong>
          Rp 850 <span>Jt+</span>
        </strong>
        <p>terpantau dalam ekosistem</p>
      </div>
      <div className="metric-note">
        <ShieldCheck size={18} />
        <p>
          Data diperbarui berkala
          <br />
          <strong>oleh tim kurator UNESA</strong>
        </p>
      </div>
    </section>
  )
}

