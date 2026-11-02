import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer>
      <div className="brand">
        <span className="brand-mark">
          <Sparkles size={16} />
        </span>
        <span>
          UNESA <strong>Event Hub</strong>
        </span>
      </div>
      <p>Prototype akademik untuk ekosistem prestasi mahasiswa.</p>
      <span className="footer-code">BUILD 0.9.4 / SURABAYA</span>
    </footer>
  )
}

