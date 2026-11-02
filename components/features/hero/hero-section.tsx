import { ArrowUpRight } from 'lucide-react'
import { Overline } from '@/components/common/overline'
import { RadarVisual } from './radar-visual'

interface HeroSectionProps {
  onExploreClick: () => void
}

export function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-content">
        <Overline>RADAR PRESTASI UNESA / 2026</Overline>
        <h1>
          Terhubung dengan
          <br />
          <em>ekosistem prestasi</em>
          <br />
          dan inovasi.
        </h1>
        <p>
          Kurasi kompetisi, hibah, dan program pengembangan mahasiswa dalam satu ruang yang mudah
          ditelusuri.
        </p>
        <button className="primary-button" onClick={onExploreClick}>
          Eksplorasi Kompetisi <ArrowUpRight size={17} />
        </button>
      </div>
      <RadarVisual />
    </section>
  )
}

