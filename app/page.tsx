'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Download,
  ExternalLink,
  FileText,
  Filter,
  HardDriveDownload,
  LayoutGrid,
  Menu,
  Moon,
  MoreHorizontal,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Users,
  WifiOff,
  X,
} from 'lucide-react'

type Event = {
  id: string
  title: string
  category: string
  organizer: string
  date: string
  deadline: string
  fee: string
  format: string
  prize: string
  poster: string
  tone: string
  featured?: boolean
  team?: boolean
  free?: boolean
  scope: string
  eligibility: string[]
  skpi: string
}

const events: Event[] = [
  { id: 'pkm', title: 'PKM 5 Bidang 2026', category: 'Karya Tulis Ilmiah', organizer: 'Direktorat Kemahasiswaan UNESA', date: '18 Okt 2026', deadline: 'Tutup 3 hari lagi', fee: 'Gratis', format: 'Beregu / 3–5 orang', prize: 'Rp 150 Jt+', poster: 'PKM 2026', tone: 'blue', featured: true, team: true, free: true, scope: 'Kompetisi proposal ilmiah untuk mengembangkan gagasan mahasiswa menjadi solusi berdampak.', eligibility: ['Mahasiswa aktif UNESA', 'Proposal belum pernah didanai sebelumnya', 'Satu mahasiswa hanya dapat mengusulkan satu judul'], skpi: '5 Poin SKPI' },
  { id: 'gemastik', title: 'GEMASTIK XVIII', category: 'Teknologi & Coding', organizer: 'Pusat Prestasi Nasional', date: '24 Okt 2026', deadline: 'Tutup 9 hari lagi', fee: 'Gratis', format: 'Beregu / 2–3 orang', prize: 'Rp 200 Jt+', poster: 'GEMASTIK\nXVIII', tone: 'ink', featured: true, team: true, free: true, scope: 'Ajang talenta digital nasional dengan cabang pemrograman, keamanan siber, dan desain pengalaman.', eligibility: ['Mahasiswa aktif perguruan tinggi', 'Membawa kartu mahasiswa saat registrasi', 'Tim mengikuti satu cabang lomba'], skpi: '4 Poin SKPI' },
  { id: 'webinar-riset', title: 'Webinar Nasional Riset & Karir Mahasiswa 2026', category: 'Webinar & Seminar', organizer: 'Direktorat Kemahasiswaan dan Alumni UNESA', date: '25 Oktober 2026', deadline: 'Tutup 6 hari lagi', fee: 'Gratis', format: 'Daring (Zoom Meeting)', prize: 'E-Sertifikat & SKPI', poster: 'WEBINAR\nRISET', tone: 'blue', featured: true, team: false, free: true, scope: 'Pemaparan strategi penulisan karya ilmiah bereputasi dan peluang hibah karir bagi mahasiswa aktif UNESA.', eligibility: ['Mahasiswa aktif UNESA jenjang D4/S1', 'Memiliki akun email SSO UNESA aktif', 'Mengisi presensi kehadiran dan evaluasi kegiatan'], skpi: '2 Poin SKPI' },
  { id: 'workshop-pwa', title: 'Workshop UI/UX & PWA Frontend 2026', category: 'Workshop', organizer: 'Himpunan Mahasiswa Sistem Informasi FT UNESA', date: '02 November 2026', deadline: 'Tutup 14 hari lagi', fee: 'Gratis', format: 'Hybrid (Lab SI Gedung K9 / Online)', prize: 'E-Sertifikat & Portofolio', poster: 'WORKSHOP\nPWA', tone: 'coral', featured: true, team: false, free: true, scope: 'Pelatihan praktis perancangan antarmuka mobile-first berbasis Progressive Web App dan pengujian usability terstandar.', eligibility: ['Mahasiswa aktif UNESA', 'Membawa laptop dengan web browser modern', 'Memiliki pemahaman dasar antarmuka web'], skpi: '3 Poin SKPI' },
  { id: 'kriya', title: 'Festival Kriya Nusantara', category: 'Seni & Desain', organizer: 'FBS UNESA', date: '06 Nov 2026', deadline: 'Tutup 22 hari lagi', fee: 'Rp 50.000', format: 'Individu', prize: 'Rp 25 Jt', poster: 'KRIYA\nNUSANTARA', tone: 'mint', free: false, scope: 'Ruang temu karya kriya mahasiswa yang merawat material, cerita lokal, dan desain berkelanjutan.', eligibility: ['Mahasiswa aktif', 'Karya orisinal dan belum dipamerkan', 'Melampirkan narasi konsep karya'], skpi: '2 Poin SKPI' },
  { id: 'olimpiade', title: 'Olimpiade Sains UNESA', category: 'Olimpiade & Sains', organizer: 'FMIPA UNESA', date: '12 Nov 2026', deadline: 'Tutup 28 hari lagi', fee: 'Gratis', format: 'Individu', prize: 'Rp 18 Jt', poster: 'SAINS\nUNESA', tone: 'yellow', free: true, scope: 'Uji ketajaman nalar dan pemecahan masalah sains untuk mahasiswa lintas program studi.', eligibility: ['Mahasiswa aktif semester 1–8', 'Memilih satu bidang olimpiade', 'Peserta wajib mengikuti babak penyisihan'], skpi: '3 Poin SKPI' },
  { id: 'startup', title: 'UNESA Startup Challenge', category: 'Teknologi & Coding', organizer: 'Inkubator Bisnis UNESA', date: '20 Nov 2026', deadline: 'Tutup 36 hari lagi', fee: 'Gratis', format: 'Beregu / 2–4 orang', prize: 'Rp 80 Jt', poster: 'STARTUP\nCHALLENGE', tone: 'mint', team: true, free: true, scope: 'Program validasi ide bisnis berbasis teknologi dengan mentor industri dan demo day.', eligibility: ['Mahasiswa aktif UNESA', 'Ide memiliki dampak sosial atau ekonomi', 'Bersedia mengikuti sesi mentoring'], skpi: '3 Poin SKPI' },
  { id: 'debat', title: 'National University Debate', category: 'Karya Tulis Ilmiah', organizer: 'UKM Bahasa UNESA', date: '28 Nov 2026', deadline: 'Tutup 44 hari lagi', fee: 'Rp 75.000', format: 'Beregu / 3 orang', prize: 'Rp 30 Jt', poster: 'NUD\n2026', tone: 'purple', team: true, free: false, scope: 'Kompetisi argumentasi dan riset isu aktual untuk melatih komunikasi publik mahasiswa.', eligibility: ['Mahasiswa aktif', 'Membawa identitas kampus', 'Tim wajib menyiapkan position paper'], skpi: 'Non-SKPI' },
]

const navItems = [
  { id: 'catalog', label: 'Katalog Acara', icon: LayoutGrid },
  { id: 'offline', label: 'Disimpan Offline', icon: HardDriveDownload },
  { id: 'calendar', label: 'Kalender Kegiatan', icon: CalendarDays },
  { id: 'guide', label: 'Panduan', icon: BookOpen },
]

function Overline({ children }: { children: React.ReactNode }) {
  return <p className="overline"><span />{children}</p>
}

function Poster({ event, large = false }: { event: Event; large?: boolean }) {
  return <div className={`poster poster-${event.tone} ${large ? 'poster-large' : ''}`}><div className="poster-grid" /><div className="poster-word">{event.poster.split('\n').map((line) => <span key={line}>{line}</span>)}</div><div className="poster-mark">UNESA<br /><small>EVENT HUB</small></div></div>
}

const STORAGE_KEY_SAVED_IDS = 'unesa_eventhub_saved_ids'
const STORAGE_KEY_OFFLINE_EVENTS = 'unesa_eventhub_offline_events'
const STORAGE_KEY_LAST_SYNC = 'unesa_eventhub_last_sync'

function formatSyncDate(isoString: string) {
  if (!isoString) return 'Baru saja'
  try {
    const d = new Date(isoString)
    return (
      d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB'
    )
  } catch {
    return 'Baru saja'
  }
}

export default function Page() {
  const [view, setView] = useState('catalog')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Semua')
  const [onlySkpi, setOnlySkpi] = useState(false)
  const [saved, setSaved] = useState<string[]>(['pkm', 'gemastik'])
  const [lastSync, setLastSync] = useState<string>('')
  const [storageStats, setStorageStats] = useState<{ usageMB: number; quotaMB: number; percent: number }>({
    usageMB: 1.5,
    quotaMB: 50,
    percent: 3,
  })
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [selected, setSelected] = useState<Event | null>(null)
  const [dark, setDark] = useState(false)
  const [offline, setOffline] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const filters = ['Semua', 'Webinar & Seminar', 'Workshop', 'Karya Tulis Ilmiah', 'Teknologi & Coding', 'Olimpiade & Sains', 'Seni & Desain', 'Gratis', 'Beregu / Tim', 'Eligible SKPI']

  // Persistent Offline Storage & Service Worker Sync
  useEffect(() => {
    const savedTheme = localStorage.getItem('unesa-theme')
    if (savedTheme === 'dark') setDark(true)
    const update = () => setOffline(!navigator.onLine)
    update()
    window.addEventListener('online', update)
    window.addEventListener('offline', update)

    // Load saved events from localStorage on initial render
    let activeSaved = ['pkm', 'gemastik']
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED_IDS)
      if (stored !== null) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          activeSaved = parsed
          setSaved(parsed)
        }
      } else {
        localStorage.setItem(STORAGE_KEY_SAVED_IDS, JSON.stringify(activeSaved))
        const initialEvents = events.filter((e) => activeSaved.includes(e.id))
        localStorage.setItem(STORAGE_KEY_OFFLINE_EVENTS, JSON.stringify(initialEvents))
      }

      const syncTime = localStorage.getItem(STORAGE_KEY_LAST_SYNC)
      if (syncTime) {
        setLastSync(syncTime)
      } else {
        const now = new Date().toISOString()
        localStorage.setItem(STORAGE_KEY_LAST_SYNC, now)
        setLastSync(now)
      }
    } catch (err) {
      console.warn('[PWA] Error reading saved events from storage:', err)
    }

    // Measure storage usage
    const measureStorage = () => {
      if (typeof window !== 'undefined' && navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(({ usage = 0, quota = 52428800 }) => {
          const usageMB = +(usage / (1024 * 1024)).toFixed(1)
          const quotaMB = +(quota / (1024 * 1024)).toFixed(0)
          const percent = Math.min(100, Math.max(1, Math.round((usage / quota) * 100)))
          setStorageStats({ usageMB, quotaMB, percent })
        }).catch(() => {})
      }
    }
    measureStorage()

    // PWA Service Worker Registration & sync
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker active with scope:', reg.scope)
            if (reg.waiting) {
              reg.waiting.postMessage({ type: 'SKIP_WAITING' })
            }
            // Send current saved events to ensure SW cache is warmed up
            navigator.serviceWorker.ready.then((readyReg) => {
              const currentSavedEvents = events.filter((e) => activeSaved.includes(e.id))
              readyReg.active?.postMessage({
                type: 'SYNC_OFFLINE_EVENTS',
                payload: {
                  savedIds: activeSaved,
                  events: currentSavedEvents,
                  timestamp: Date.now(),
                },
              })
            })
          })
          .catch((err) => {
            console.error('[PWA] Service Worker registration failed:', err)
          })
      }

      if (document.readyState === 'complete') {
        registerSW()
      } else {
        window.addEventListener('load', registerSW)
      }
    }

    const handleBeforeInstall = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstall as any)

    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall as any)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('unesa-theme', dark ? 'dark' : 'light')
  }, [dark])

  const isSkpiValid = (ev: Event) => Boolean(ev.skpi && ev.skpi.trim().toLowerCase() !== 'non-skpi')

  const filtered = useMemo(() => events.filter((event) => {
    const matchesQuery = `${event.title} ${event.category} ${event.organizer} ${event.skpi} ${event.format}`.toLowerCase().includes(query.toLowerCase())
    
    let matchesCategory = false
    if (filter === 'Semua') {
      matchesCategory = true
    } else if (filter === 'Gratis') {
      matchesCategory = Boolean(event.free)
    } else if (filter === 'Beregu / Tim') {
      matchesCategory = Boolean(event.team)
    } else if (filter === 'Eligible SKPI') {
      matchesCategory = isSkpiValid(event)
    } else {
      matchesCategory = event.category === filter
    }

    const matchesSkpi = (!onlySkpi && filter !== 'Eligible SKPI') || isSkpiValid(event)
    return matchesQuery && matchesCategory && matchesSkpi
  }), [query, filter, onlySkpi])

  const handleChipClick = (item: string) => {
    if (item === 'Eligible SKPI') {
      if (filter === 'Eligible SKPI') {
        setFilter('Semua')
        setOnlySkpi(false)
      } else {
        setOnlySkpi((prev) => !prev)
      }
    } else if (item === 'Semua') {
      setFilter('Semua')
      setOnlySkpi(false)
    } else {
      setFilter((prev) => (prev === item ? 'Semua' : item))
    }
  }

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      if (choice?.outcome === 'accepted') {
        setInstalled(true)
      }
      setDeferredPrompt(null)
    } else {
      setInstalled(true)
    }
  }

  // Core offline storage persistence function
  const saveAndSync = (newSavedIds: string[], toastNotice?: string) => {
    setSaved(newSavedIds)
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_IDS, JSON.stringify(newSavedIds))
      const currentSavedEvents = events.filter((ev) => newSavedIds.includes(ev.id))
      localStorage.setItem(STORAGE_KEY_OFFLINE_EVENTS, JSON.stringify(currentSavedEvents))
      const now = new Date().toISOString()
      localStorage.setItem(STORAGE_KEY_LAST_SYNC, now)
      setLastSync(now)

      // Sync with Service Worker Cache
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.active?.postMessage({
            type: 'SYNC_OFFLINE_EVENTS',
            payload: {
              savedIds: newSavedIds,
              events: currentSavedEvents,
              timestamp: Date.now(),
            },
          })
        }).catch(() => {})
      }

      // Re-measure storage
      if (typeof window !== 'undefined' && navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(({ usage = 0, quota = 52428800 }) => {
          const usageMB = +(usage / (1024 * 1024)).toFixed(1)
          const quotaMB = +(quota / (1024 * 1024)).toFixed(0)
          const percent = Math.min(100, Math.max(1, Math.round((usage / quota) * 100)))
          setStorageStats({ usageMB, quotaMB, percent })
        }).catch(() => {})
      }
    } catch (err) {
      console.error('[PWA] Failed to update offline storage:', err)
    }

    if (toastNotice) {
      setToastMessage(toastNotice)
      if ((window as any)._pwaToastTimer) clearTimeout((window as any)._pwaToastTimer)
      ;(window as any)._pwaToastTimer = setTimeout(() => setToastMessage(null), 3200)
    }
  }

  const toggleSaved = (id: string) => {
    const isCurrentlySaved = saved.includes(id)
    const newSaved = isCurrentlySaved ? saved.filter((item) => item !== id) : [...saved, id]
    const eventObj = events.find((e) => e.id === id)
    const eventName = eventObj ? `"${eventObj.title}"` : 'Acara'
    
    if (isCurrentlySaved) {
      saveAndSync(newSaved, `${eventName} dihapus dari penyimpanan offline.`)
    } else {
      saveAndSync(newSaved, `${eventName} berhasil disimpan offline!`)
    }
  }

  const resyncOfflineStorage = () => {
    saveAndSync(saved, 'Semua acara offline berhasil disinkronkan ulang!')
  }

  const clearOfflineStorage = () => {
    if (typeof window !== 'undefined' && window.confirm('Hapus semua acara yang tersimpan offline?')) {
      saveAndSync([], 'Penyimpanan offline berhasil dibersihkan.')
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.active?.postMessage({ type: 'CLEAR_OFFLINE_EVENTS' })
        }).catch(() => {})
      }
    }
  }

  const goToCatalog = () => { setView('catalog'); setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 0) }
  const exportICS = (event: Event) => { const body = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:20261018T080000\nDESCRIPTION:${event.scope}\nEND:VEVENT\nEND:VCALENDAR`; const blob = new Blob([body], { type: 'text/calendar' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `${event.id}.ics`; link.click(); URL.revokeObjectURL(link.href) }
  const share = async (event: Event) => { const text = `${event.title} — ${event.date}\n${event.category} · ${event.format}\nSKPI: ${event.skpi}\nDaftar di UNESA Event Hub`; if (navigator.share) await navigator.share({ title: event.title, text }); else await navigator.clipboard?.writeText(text) }

  return <div className={`app-shell ${dark ? 'theme-dark' : ''}`}>
    {offline && <div className="offline-banner"><WifiOff size={15} /> Mode Luring Aktif — Menampilkan data dan berkas yang tersimpan di memori perangkat.</div>}
    <header className="topbar">
      <div className="brand" onClick={() => setView('catalog')} role="button" tabIndex={0}><span className="brand-mark"><Sparkles size={16} /></span><span>UNESA <strong>Event Hub</strong></span></div>
      <nav className="desktop-nav" aria-label="Navigasi utama">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} className={view === id ? 'active' : ''} onClick={() => setView(id)}>
            <Icon size={16} />
            {label}
            {id === 'offline' && saved.length > 0 && (
              <span className="nav-badge">{saved.length}</span>
            )}
          </button>
        ))}
      </nav>
      <div className="top-actions">
        <button className="icon-button" aria-label="Ganti tema" onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
        <button className="install-button" onClick={handleInstallClick}><Download size={16} />{installed ? 'Terpasang' : 'Install App'}</button>
        <button className="menu-button" aria-label="Buka menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>

    {menuOpen && (
      <>
        <div className="mobile-nav-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="mobile-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={view === id ? 'active' : ''}
              onClick={() => {
                setView(id)
                setMenuOpen(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <Icon size={17} />
                <span>{label}</span>
              </div>
              {id === 'offline' && saved.length > 0 && (
                <span className="mobile-menu-badge">{saved.length}</span>
              )}
            </button>
          ))}
        </div>
      </>
    )}

    {view === 'catalog' && <main>
      <section className="hero"><div className="hero-grid" /><div className="hero-content"><Overline>RADAR PRESTASI UNESA / 2026</Overline><h1>Terhubung dengan<br /><em>ekosistem prestasi</em><br />dan inovasi.</h1><p>Kurasi kompetisi, hibah, dan program pengembangan mahasiswa dalam satu ruang yang mudah ditelusuri.</p><button className="primary-button" onClick={goToCatalog}>Eksplorasi Kompetisi <ArrowUpRight size={17} /></button></div><div className="radar"><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-ring ring-three" /><div className="radar-sweep" /><div className="radar-dot dot-a" /><div className="radar-dot dot-b" /><div className="radar-dot dot-c" /><span className="radar-label label-a">PKM 5 BIDANG</span><span className="radar-label label-b">GEMASTIK XVIII</span></div></section>
      <section className="metrics"><div><Overline>EVENT TERVERIFIKASI</Overline><strong>150<span>+</span></strong><p>acara aktif dan terkurasi</p></div><div><Overline>TOTAL HIBAH & APRESIASI</Overline><strong>Rp 850 <span>Jt+</span></strong><p>terpantau dalam ekosistem</p></div><div className="metric-note"><ShieldCheck size={18} /><p>Data diperbarui berkala<br /><strong>oleh tim kurator UNESA</strong></p></div></section>
      <section className="showcase"><div className="section-heading"><div><Overline>DISOROT MINGGU INI</Overline><h2>Program yang sedang ramai.</h2></div><button className="text-button" onClick={goToCatalog}>Lihat semua acara <ChevronRight size={16} /></button></div><div className="featured-grid">{events.filter((event) => event.featured).map((event) => <button className="featured-card" key={event.id} onClick={() => setSelected(event)}><Poster event={event} large /><div className="featured-copy"><span>{event.category}</span><h3>{event.title}</h3><p>{event.scope}</p><span className="arrow-circle"><ArrowUpRight size={18} /></span></div></button>)}</div></section>
      <section className="catalog" id="catalog"><div className="section-heading"><div><Overline>DIRECTORY / {String(filtered.length).padStart(2, '0')} RESULTS</Overline><h2>Temukan ruang bertumbuh.</h2></div><p className="section-aside">Gunakan filter untuk menemukan<br />acara yang paling relevan.</p></div><div className="search-row"><label className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari kompetisi, bidang, atau penyelenggara" aria-label="Cari event" />{query && <button onClick={() => setQuery('')} aria-label="Hapus pencarian"><X size={16} /></button>}</label><button className="filter-toggle"><Filter size={16} /> Filter</button></div><div className="chips" role="group" aria-label="Filter acara">{filters.map((item) => { const isSelected = item === 'Eligible SKPI' ? (onlySkpi || filter === 'Eligible SKPI') : (filter === item && (item !== 'Semua' || !onlySkpi)); return <button key={item} className={isSelected ? 'selected' : ''} onClick={() => handleChipClick(item)}>{item === 'Eligible SKPI' ? '⭐ Eligible SKPI' : item}</button> })}</div><div className="event-grid">{filtered.map((event) => <article className="event-card" key={event.id}><button className="card-poster-button" onClick={() => setSelected(event)} aria-label={`Lihat detail ${event.title}`}><Poster event={event} /><span className="deadline-badge">{event.deadline}</span></button><div className="event-body"><div className="event-tags-row"><span className="category-label">{event.category}</span>{isSkpiValid(event) && <span className="skpi-badge" title="Poin SKPI Terverifikasi">⭐ {event.skpi}</span>}</div><h3>{event.title}</h3><p className="organizer">{event.organizer}</p><div className="event-meta"><span><CalendarDays size={14} />{event.date}</span><span><Users size={14} />{event.format}</span><span><Sparkles size={14} />{event.fee}</span></div><div className="event-actions"><button onClick={() => toggleSaved(event.id)} className={saved.includes(event.id) ? 'saved' : ''}><BookmarkIcon filled={saved.includes(event.id)} />{saved.includes(event.id) ? 'Tersimpan' : 'Simpan Offline'}</button><button onClick={() => exportICS(event)} aria-label="Export kalender"><CalendarDays size={15} />.ICS</button><button onClick={() => share(event)} aria-label="Bagikan acara"><Share2 size={15} /></button><button className="detail-link" onClick={() => setSelected(event)}>Detail <ArrowUpRight size={15} /></button></div></div></article>)}</div>{filtered.length === 0 && <div className="empty-state"><Search size={24} /><h3>Tidak ada acara yang cocok.</h3><p>Coba kata kunci atau filter lain.</p></div>}</section>
    </main>}

    {view === 'offline' && (
      <OfflineView
        saved={saved}
        toggleSaved={toggleSaved}
        setView={setView}
        setSelected={setSelected}
        storageStats={storageStats}
        lastSync={lastSync}
        resyncOfflineStorage={resyncOfflineStorage}
        clearOfflineStorage={clearOfflineStorage}
      />
    )}
    {view === 'calendar' && <CalendarView exportICS={() => events.forEach(exportICS)} setSelected={setSelected} />}
    {view === 'guide' && <GuideView />}

    <footer><div className="brand"><span className="brand-mark"><Sparkles size={16} /></span><span>UNESA <strong>Event Hub</strong></span></div><p>Prototype akademik untuk ekosistem prestasi mahasiswa.</p><span className="footer-code">BUILD 0.9.4 / SURABAYA</span></footer>

    {/* Native PWA Mobile Bottom Navigation */}
    <nav className="mobile-bottom-nav" aria-label="Navigasi Mobile PWA">
      {navItems.map(({ id, label, icon: Icon }) => {
        const isActive = view === id
        const isOfflineTab = id === 'offline'
        return (
          <button
            key={id}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              setView(id)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            aria-label={label}
          >
            <div className="bottom-nav-icon-wrapper">
              <Icon size={19} />
              {isOfflineTab && saved.length > 0 && (
                <span className="bottom-nav-badge">{saved.length}</span>
              )}
            </div>
            <span className="bottom-nav-label">
              {id === 'catalog' ? 'Katalog' : id === 'offline' ? 'Disimpan' : id === 'calendar' ? 'Kalender' : 'Panduan'}
            </span>
          </button>
        )
      })}
    </nav>

    {selected && <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}>
      <div className="detail-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={(event) => event.stopPropagation()}>
        <div className="modal-drag-indicator" aria-hidden="true" />
        <button className="modal-close" onClick={() => setSelected(null)} aria-label="Tutup detail"><X size={18} /></button>
        <div className="detail-poster">
          <Poster event={selected} large />
          <button className="outline-button"><Download size={15} /> Unduh Rulebook PDF</button>
        </div>
        <div className="detail-copy">
          <Overline>{selected.category} / DETAIL ACARA</Overline>
          <h2>{selected.title}</h2>
          <p className="detail-scope">{selected.scope}</p>
          <div className="detail-stats">
            <div><span>Tanggal pelaksanaan</span><strong>{selected.date}</strong></div>
            <div><span>Biaya registrasi</span><strong>{selected.fee}</strong></div>
            <div><span>Format kegiatan</span><strong>{selected.format}</strong></div>
            <div><span>Poin SKPI</span><strong className={isSkpiValid(selected) ? 'skpi-stat' : ''}>{selected.skpi}</strong></div>
            <div><span>Total apresiasi</span><strong>{selected.prize}</strong></div>
            <div><span>Penyelenggara</span><strong>{selected.organizer}</strong></div>
          </div>
          <h4>Persyaratan utama</h4>
          <ul>{selected.eligibility.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
          <div className="detail-footer">
            <div className="detail-actions-row">
              <button className="primary-button full-width">Daftar di Portal Resmi <ExternalLink size={16} /></button>
              <button
                className={`modal-save-btn ${saved.includes(selected.id) ? 'saved' : ''}`}
                onClick={() => toggleSaved(selected.id)}
                aria-label={saved.includes(selected.id) ? 'Hapus dari offline' : 'Simpan offline'}
              >
                <BookmarkIcon filled={saved.includes(selected.id)} />
                {saved.includes(selected.id) ? 'Tersimpan' : 'Simpan Offline'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>}

    {toastMessage && (
      <div className="pwa-toast" role="status" aria-live="polite">
        <span className="pwa-toast-icon"><Check size={16} /></span>
        <span>{toastMessage}</span>
      </div>
    )}
  </div>
}

function BookmarkIcon({ filled }: { filled: boolean }) { return <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" /></svg> }

function OfflineView({
  saved,
  toggleSaved,
  setView,
  setSelected,
  storageStats,
  lastSync,
  resyncOfflineStorage,
  clearOfflineStorage,
}: {
  saved: string[]
  toggleSaved: (id: string) => void
  setView: (view: string) => void
  setSelected: (event: Event) => void
  storageStats: { usageMB: number; quotaMB: number; percent: number }
  lastSync: string
  resyncOfflineStorage: () => void
  clearOfflineStorage: () => void
}) {
  const savedEvents = events.filter((event) => saved.includes(event.id))
  return <main className="subpage">
    <div className="subpage-intro"><Overline>STORAGE / LOCAL PERSISTENCE</Overline><h1>Disimpan <em>offline.</em></h1><p>Acara dan berkas penting yang tetap tersedia saat koneksi sedang tidak bersahabat.</p></div>
    <div className="storage-grid">
      <div className="storage-card storage-main">
        <div className="storage-top"><div><span className="status-dot" />PWA STORAGE ACTIVE</div><MoreHorizontal size={19} /></div>
        <strong>{storageStats.usageMB} <small>MB</small></strong>
        <p>terpakai dari {storageStats.quotaMB} MB kuota lokal ({storageStats.percent}%)</p>
        <div className="progress"><span style={{ width: `${storageStats.percent}%` }} /></div>
        <div className="storage-actions">
          <button className="primary-button" onClick={resyncOfflineStorage}><Download size={15} /> Sinkronkan Ulang</button>
          <button className="text-button" onClick={clearOfflineStorage}>Bersihkan cache</button>
        </div>
      </div>
      <div className="storage-card cache-info"><WifiOff size={22} /><h3>Siap untuk luring</h3><p>Semua acara tersimpan memiliki detail, rulebook, dan tautan pendaftaran yang dapat diakses tanpa koneksi.</p><span>Terakhir sinkronisasi · {formatSyncDate(lastSync)}</span></div>
    </div>
    <div className="subpage-section">
      <div className="section-heading"><div><Overline>MY COLLECTION / {String(savedEvents.length).padStart(2, '0')} ITEMS</Overline><h2>Kompetisi pilihanmu.</h2></div><button className="text-button" onClick={() => setView('catalog')}>Tambah acara <ChevronRight size={16} /></button></div>
      <div className="saved-list">
        {savedEvents.map((event) => (
          <div className="saved-item" key={event.id}>
            <div className="saved-poster-wrapper"><Poster event={event} /></div>
            <div className="saved-item-info">
              <span className="ready-badge">● Tersedia Tanpa Internet</span>
              <h3>{event.title}</h3>
              <p>{event.organizer} · {event.date}</p>
            </div>
            <div className="saved-item-actions">
              <button onClick={() => setSelected(event)} className="text-button">Buka detail <ArrowUpRight size={15} /></button>
              <button onClick={() => toggleSaved(event.id)} className="remove-button" aria-label={`Hapus ${event.title}`} title="Hapus dari offline"><X size={15} /></button>
            </div>
          </div>
        ))}
        {savedEvents.length === 0 && <div className="empty-state"><HardDriveDownload size={24} /><h3>Belum ada acara yang disimpan offline.</h3><p>Simpan acara dari katalog agar dapat diakses kapan saja.</p></div>}
      </div>
    </div>
    <div className="subpage-section">
      <div className="section-heading"><div><Overline>DOWNLOADED FILES / 03 PDF</Overline><h2>Rak rulebook.</h2></div></div>
      <div className="file-grid">{['Panduan PKM 2026.pdf', 'Technical Handbook GEMASTIK.pdf', 'Template Proposal UNESA.docx'].map((file, index) => <div className="file-tile" key={file}>
        <FileText size={22} />
        <div><strong>{file}</strong><span>{index === 2 ? '218 KB' : '2.4 MB'} · 10 Sep 2026</span></div>
        <button aria-label={`Buka ${file}`}><ArrowUpRight size={16} /></button>
      </div>)}</div>
    </div>
  </main>
}

function CalendarView({ exportICS, setSelected }: { exportICS: () => void; setSelected: (event: Event) => void }) {
  return <main className="subpage">
    <div className="subpage-intro split-intro"><div><Overline>TIMELINE / DEADLINE RADAR</Overline><h1>Kalender <em>kegiatan.</em></h1><p>Jangan biarkan peluang lewat begitu saja. Semua tanggal penting, dalam satu pandangan.</p></div><button className="primary-button" onClick={exportICS}><CalendarDays size={16} /> Sinkronisasi .ICS</button></div>
    <div className="deadline-metrics"><div><Overline>TUTUP DALAM 72 JAM</Overline><strong>03 <small>Event</small></strong></div><div><Overline>TAHAP REVIEW</Overline><strong>06 <small>Event</small></strong></div><div><Overline>PENGUMUMAN FINALIS</Overline><strong>02 <small>Event</small></strong></div></div>
    <div className="timeline">
      {[
        ['15 OKT', 'Batas pengumpulan proposal', 'PKM 5 Bidang 2026', 'deadline'],
        ['20 OKT', 'Technical meeting nasional', 'GEMASTIK XVIII', 'review'],
        ['06 NOV', 'Kurasi dan penjurian karya', 'Festival Kriya Nusantara', 'review'],
        ['12 NOV', 'Pengumuman finalis', 'Olimpiade Sains UNESA', 'announce']
      ].map(([day, phase, title, tone]) => (
        <div className="timeline-item" key={title}>
          <div className="timeline-date">{day}</div>
          <div className={`timeline-line ${tone}`} />
          <button className="timeline-card" onClick={() => setSelected(events.find((event) => event.title === title) ?? events[0])}>
            <div className="timeline-card-content">
              <span className="timeline-card-phase">{phase}</span>
              <h3 className="timeline-card-title">{title}</h3>
            </div>
            <ChevronRight size={17} />
          </button>
        </div>
      ))}
    </div>
  </main>
}

function GuideView() {
  const [guidePlatform, setGuidePlatform] = useState<'android' | 'ios'>('android')
  const steps = [
    ['01', 'Validasi Akun', 'Pastikan profil mahasiswa dan email institusi telah aktif.'],
    ['02', 'Rekomendasi Fakultas', 'Pilih program yang selaras dengan minat dan rekam jejakmu.'],
    ['03', 'Verifikasi Penyelenggara', 'Periksa rulebook, jadwal, dan kanal resmi sebelum mendaftar.'],
    ['04', 'SK Tugas Rektorat', 'Ajukan dukungan resmi untuk kompetisi tingkat nasional.']
  ];
  const resources = [
    { title: 'Template Proposal', meta: 'DOCX · 218 KB', icon: FileText },
    { title: 'Surat Tugas Rektorat', meta: 'DOCX · 144 KB', icon: ShieldCheck },
    { title: 'Form Pengajuan Dana', meta: 'PDF · 92 KB', icon: Download }
  ];
  return <main className="subpage guide-page">
    <div className="subpage-intro"><Overline>DOCUMENTATION / HOW IT WORKS</Overline><h1>Panduan untuk<br /><em>melangkah lebih jauh.</em></h1><p>Prosedur ringkas agar setiap delegasi siap berangkat dengan informasi yang tepat.</p></div>
    <section className="guide-section">
      <div className="section-heading"><div><Overline>DELEGATION FLOW</Overline><h2>Empat langkah, satu arah.</h2></div></div>
      <div className="stepper">
        {steps.map(([number, title, description]) => (
          <div className="step" key={number}>
            <div className="step-header">
              <span className="step-number">{number}</span>
              <span className="step-tag">Tahap {number}</span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="guide-section resource-section">
      <div className="section-heading"><div><Overline>RESOURCE LIBRARY</Overline><h2>Mulai dari fondasi yang benar.</h2></div></div>
      <div className="resource-grid">
        {resources.map(({ title, meta, icon: Icon }) => (
          <button className="resource-tile" key={title}>
            <Icon size={22} />
            <div><strong>{title}</strong><span>{meta}</span></div>
            <Download size={16} />
          </button>
        ))}
      </div>
    </section>
    <section className="install-guide">
      <div>
        <Smartphone size={25} />
        <Overline>INSTALLATION GUIDE</Overline>
        <h2>Bawa radar prestasi<br />ke layar utama.</h2>
        <p>Install sebagai PWA untuk akses cepat, notifikasi deadline, dan mode luring tanpa hambatan.</p>
      </div>
      <div className="install-tabs">
        <div className="install-tabs-nav">
          <button
            className={`install-tab-btn ${guidePlatform === 'android' ? 'selected' : ''}`}
            onClick={() => setGuidePlatform('android')}
          >
            Chrome / Android
          </button>
          <button
            className={`install-tab-btn ${guidePlatform === 'ios' ? 'selected' : ''}`}
            onClick={() => setGuidePlatform('ios')}
          >
            Safari / iOS
          </button>
        </div>
        {guidePlatform === 'android' ? (
          <ol className="install-steps">
            <li>Buka peramban <strong>Chrome</strong> di ponsel Android.</li>
            <li>Ketuk menu titik tiga di kanan atas.</li>
            <li>Pilih <strong>Install app</strong> atau <strong>Tambahkan ke Layar Utama</strong>.</li>
            <li>Buka aplikasi langsung dari app drawer atau homescreen.</li>
          </ol>
        ) : (
          <ol className="install-steps">
            <li>Buka peramban <strong>Safari</strong> di perangkat iOS / iPhone.</li>
            <li>Ketuk tombol <strong>Bagikan (Share)</strong> di baris navigasi bawah.</li>
            <li>Gulir ke bawah dan ketuk <strong>Add to Home Screen (Layar Utama)</strong>.</li>
            <li>Ketuk <strong>Tambah (Add)</strong> di pojok kanan atas.</li>
          </ol>
        )}
      </div>
    </section>
  </main>
}
