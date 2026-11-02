import { useState } from 'react'
import { Smartphone } from 'lucide-react'
import type { GuidePlatform } from '@/types'
import { Overline } from '@/components/common/overline'

export function PwaInstallGuide() {
  const [guidePlatform, setGuidePlatform] = useState<GuidePlatform>('android')

  return (
    <section className="install-guide">
      <div>
        <Smartphone size={25} />
        <Overline>INSTALLATION GUIDE</Overline>
        <h2>
          Bawa radar prestasi
          <br />
          ke layar utama.
        </h2>
        <p>
          Install sebagai PWA untuk akses cepat, notifikasi deadline, dan mode
          luring tanpa hambatan.
        </p>
      </div>

      <div className="install-tabs">
        <div className="install-tabs-nav">
          <button
            type="button"
            className={`install-tab-btn ${guidePlatform === 'android' ? 'selected' : ''}`}
            onClick={() => setGuidePlatform('android')}
          >
            Chrome / Android
          </button>
          <button
            type="button"
            className={`install-tab-btn ${guidePlatform === 'ios' ? 'selected' : ''}`}
            onClick={() => setGuidePlatform('ios')}
          >
            Safari / iOS
          </button>
        </div>

        {guidePlatform === 'android' ? (
          <ol className="install-steps">
            <li>
              Buka peramban <strong>Chrome</strong> di ponsel Android.
            </li>
            <li>Ketuk menu titik tiga di kanan atas.</li>
            <li>
              Pilih <strong>Install app</strong> atau{' '}
              <strong>Tambahkan ke Layar Utama</strong>.
            </li>
            <li>Buka aplikasi langsung dari app drawer atau homescreen.</li>
          </ol>
        ) : (
          <ol className="install-steps">
            <li>
              Buka peramban <strong>Safari</strong> di perangkat iOS / iPhone.
            </li>
            <li>
              Ketuk tombol <strong>Bagikan (Share)</strong> di baris navigasi
              bawah.
            </li>
            <li>
              Gulir ke bawah dan ketuk{' '}
              <strong>Add to Home Screen (Layar Utama)</strong>.
            </li>
            <li>
              Ketuk <strong>Tambah (Add)</strong> di pojok kanan atas.
            </li>
          </ol>
        )}
      </div>
    </section>
  )
}

