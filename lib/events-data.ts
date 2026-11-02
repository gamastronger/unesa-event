import {
  BookOpen,
  CalendarDays,
  Download,
  FileText,
  HardDriveDownload,
  LayoutGrid,
  ShieldCheck,
} from 'lucide-react'
import type {
  DeadlineMetric,
  Event,
  GuideResource,
  GuideStep,
  NavItem,
  TimelineItem,
} from '@/types'

export const STORAGE_KEY_SAVED_IDS = 'unesa_eventhub_saved_ids'
export const STORAGE_KEY_OFFLINE_EVENTS = 'unesa_eventhub_offline_events'
export const STORAGE_KEY_LAST_SYNC = 'unesa_eventhub_last_sync'
export const STORAGE_KEY_THEME = 'unesa-theme'

export const events: Event[] = [
  {
    id: 'pkm',
    title: 'PKM 5 Bidang 2026',
    category: 'Karya Tulis Ilmiah',
    organizer: 'Direktorat Kemahasiswaan UNESA',
    date: '18 Okt 2026',
    deadline: 'Tutup 3 hari lagi',
    fee: 'Gratis',
    format: 'Beregu / 3–5 orang',
    prize: 'Rp 150 Jt+',
    poster: 'PKM 2026',
    tone: 'blue',
    featured: true,
    team: true,
    free: true,
    scope: 'Kompetisi proposal ilmiah untuk mengembangkan gagasan mahasiswa menjadi solusi berdampak.',
    eligibility: [
      'Mahasiswa aktif UNESA',
      'Proposal belum pernah didanai sebelumnya',
      'Satu mahasiswa hanya dapat mengusulkan satu judul',
    ],
    skpi: '5 Poin SKPI',
  },
  {
    id: 'gemastik',
    title: 'GEMASTIK XVIII',
    category: 'Teknologi & Coding',
    organizer: 'Pusat Prestasi Nasional',
    date: '24 Okt 2026',
    deadline: 'Tutup 9 hari lagi',
    fee: 'Gratis',
    format: 'Beregu / 2–3 orang',
    prize: 'Rp 200 Jt+',
    poster: 'GEMASTIK\nXVIII',
    tone: 'ink',
    featured: true,
    team: true,
    free: true,
    scope: 'Ajang talenta digital nasional dengan cabang pemrograman, keamanan siber, dan desain pengalaman.',
    eligibility: [
      'Mahasiswa aktif perguruan tinggi',
      'Membawa kartu mahasiswa saat registrasi',
      'Tim mengikuti satu cabang lomba',
    ],
    skpi: '4 Poin SKPI',
  },
  {
    id: 'webinar-riset',
    title: 'Webinar Nasional Riset & Karir Mahasiswa 2026',
    category: 'Webinar & Seminar',
    organizer: 'Direktorat Kemahasiswaan dan Alumni UNESA',
    date: '25 Oktober 2026',
    deadline: 'Tutup 6 hari lagi',
    fee: 'Gratis',
    format: 'Daring (Zoom Meeting)',
    prize: 'E-Sertifikat & SKPI',
    poster: 'WEBINAR\nRISET',
    tone: 'blue',
    featured: true,
    team: false,
    free: true,
    scope: 'Pemaparan strategi penulisan karya ilmiah bereputasi dan peluang hibah karir bagi mahasiswa aktif UNESA.',
    eligibility: [
      'Mahasiswa aktif UNESA jenjang D4/S1',
      'Memiliki akun email SSO UNESA aktif',
      'Mengisi presensi kehadiran dan evaluasi kegiatan',
    ],
    skpi: '2 Poin SKPI',
  },
  {
    id: 'workshop-pwa',
    title: 'Workshop UI/UX & PWA Frontend 2026',
    category: 'Workshop',
    organizer: 'Himpunan Mahasiswa Sistem Informasi FT UNESA',
    date: '02 November 2026',
    deadline: 'Tutup 14 hari lagi',
    fee: 'Gratis',
    format: 'Hybrid (Lab SI Gedung K9 / Online)',
    prize: 'E-Sertifikat & Portofolio',
    poster: 'WORKSHOP\nPWA',
    tone: 'coral',
    featured: true,
    team: false,
    free: true,
    scope: 'Pelatihan praktis perancangan antarmuka mobile-first berbasis Progressive Web App dan pengujian usability terstandar.',
    eligibility: [
      'Mahasiswa aktif UNESA',
      'Membawa laptop dengan web browser modern',
      'Memiliki pemahaman dasar antarmuka web',
    ],
    skpi: '3 Poin SKPI',
  },
  {
    id: 'kriya',
    title: 'Festival Kriya Nusantara',
    category: 'Seni & Desain',
    organizer: 'FBS UNESA',
    date: '06 Nov 2026',
    deadline: 'Tutup 22 hari lagi',
    fee: 'Rp 50.000',
    format: 'Individu',
    prize: 'Rp 25 Jt',
    poster: 'KRIYA\nNUSANTARA',
    tone: 'mint',
    free: false,
    scope: 'Ruang temu karya kriya mahasiswa yang merawat material, cerita lokal, dan desain berkelanjutan.',
    eligibility: [
      'Mahasiswa aktif',
      'Karya orisinal dan belum dipamerkan',
      'Melampirkan narasi konsep karya',
    ],
    skpi: '2 Poin SKPI',
  },
  {
    id: 'olimpiade',
    title: 'Olimpiade Sains UNESA',
    category: 'Olimpiade & Sains',
    organizer: 'FMIPA UNESA',
    date: '12 Nov 2026',
    deadline: 'Tutup 28 hari lagi',
    fee: 'Gratis',
    format: 'Individu',
    prize: 'Rp 18 Jt',
    poster: 'SAINS\nUNESA',
    tone: 'yellow',
    free: true,
    scope: 'Uji ketajaman nalar dan pemecahan masalah sains untuk mahasiswa lintas program studi.',
    eligibility: [
      'Mahasiswa aktif semester 1–8',
      'Memilih satu bidang olimpiade',
      'Peserta wajib mengikuti babak penyisihan',
    ],
    skpi: '3 Poin SKPI',
  },
  {
    id: 'startup',
    title: 'UNESA Startup Challenge',
    category: 'Teknologi & Coding',
    organizer: 'Inkubator Bisnis UNESA',
    date: '20 Nov 2026',
    deadline: 'Tutup 36 hari lagi',
    fee: 'Gratis',
    format: 'Beregu / 2–4 orang',
    prize: 'Rp 80 Jt',
    poster: 'STARTUP\nCHALLENGE',
    tone: 'mint',
    team: true,
    free: true,
    scope: 'Program validasi ide bisnis berbasis teknologi dengan mentor industri dan demo day.',
    eligibility: [
      'Mahasiswa aktif UNESA',
      'Ide memiliki dampak sosial atau ekonomi',
      'Bersedia mengikuti sesi mentoring',
    ],
    skpi: '3 Poin SKPI',
  },
  {
    id: 'debat',
    title: 'National University Debate',
    category: 'Karya Tulis Ilmiah',
    organizer: 'UKM Bahasa UNESA',
    date: '28 Nov 2026',
    deadline: 'Tutup 44 hari lagi',
    fee: 'Rp 75.000',
    format: 'Beregu / 3 orang',
    prize: 'Rp 30 Jt',
    poster: 'NUD\n2026',
    tone: 'purple',
    team: true,
    free: false,
    scope: 'Kompetisi argumentasi dan riset isu aktual untuk melatih komunikasi publik mahasiswa.',
    eligibility: [
      'Mahasiswa aktif',
      'Membawa identitas kampus',
      'Tim wajib menyiapkan position paper',
    ],
    skpi: 'Non-SKPI',
  },
]

export const navItems: NavItem[] = [
  { id: 'catalog', label: 'Katalog Acara', icon: LayoutGrid },
  { id: 'offline', label: 'Disimpan Offline', icon: HardDriveDownload },
  { id: 'calendar', label: 'Kalender Kegiatan', icon: CalendarDays },
  { id: 'guide', label: 'Panduan', icon: BookOpen },
]

export const eventFilters: string[] = [
  'Semua',
  'Webinar & Seminar',
  'Workshop',
  'Karya Tulis Ilmiah',
  'Teknologi & Coding',
  'Olimpiade & Sains',
  'Seni & Desain',
  'Gratis',
  'Beregu / Tim',
  'Eligible SKPI',
]

export const timelineEvents: TimelineItem[] = [
  {
    day: '15 OKT',
    phase: 'Batas pengumpulan proposal',
    title: 'PKM 5 Bidang 2026',
    tone: 'deadline',
  },
  {
    day: '20 OKT',
    phase: 'Technical meeting nasional',
    title: 'GEMASTIK XVIII',
    tone: 'review',
  },
  {
    day: '06 NOV',
    phase: 'Kurasi dan penjurian karya',
    title: 'Festival Kriya Nusantara',
    tone: 'review',
  },
  {
    day: '12 NOV',
    phase: 'Pengumuman finalis',
    title: 'Olimpiade Sains UNESA',
    tone: 'announce',
  },
]

export const deadlineMetrics: DeadlineMetric[] = [
  { label: 'TUTUP DALAM 72 JAM', count: '03', unit: 'Event' },
  { label: 'TAHAP REVIEW', count: '06', unit: 'Event' },
  { label: 'PENGUMUMAN FINALIS', count: '02', unit: 'Event' },
]

export const guideSteps: GuideStep[] = [
  {
    number: '01',
    title: 'Validasi Akun',
    description: 'Pastikan profil mahasiswa dan email institusi telah aktif.',
  },
  {
    number: '02',
    title: 'Rekomendasi Fakultas',
    description: 'Pilih program yang selaras dengan minat dan rekam jejakmu.',
  },
  {
    number: '03',
    title: 'Verifikasi Penyelenggara',
    description: 'Periksa rulebook, jadwal, dan kanal resmi sebelum mendaftar.',
  },
  {
    number: '04',
    title: 'SK Tugas Rektorat',
    description: 'Ajukan dukungan resmi untuk kompetisi tingkat nasional.',
  },
]

export const guideResources: GuideResource[] = [
  { title: 'Template Proposal', meta: 'DOCX · 218 KB', icon: FileText },
  { title: 'Surat Tugas Rektorat', meta: 'DOCX · 144 KB', icon: ShieldCheck },
  { title: 'Form Pengajuan Dana', meta: 'PDF · 92 KB', icon: Download },
]

export const offlineRulebookFiles = [
  { name: 'Panduan PKM 2026.pdf', size: '2.4 MB', date: '10 Sep 2026' },
  { name: 'Technical Handbook GEMASTIK.pdf', size: '2.4 MB', date: '10 Sep 2026' },
  { name: 'Template Proposal UNESA.docx', size: '218 KB', date: '10 Sep 2026' },
]

export function formatSyncDate(isoString: string): string {
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

export function isSkpiValid(ev: Event): boolean {
  return Boolean(ev.skpi && ev.skpi.trim().toLowerCase() !== 'non-skpi')
}

export function exportICS(event: Event): void {
  const body = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:20261018T080000\nDESCRIPTION:${event.scope}\nEND:VEVENT\nEND:VCALENDAR`
  const blob = new Blob([body], { type: 'text/calendar' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${event.id}.ics`
  link.click()
  URL.revokeObjectURL(link.href)
}

export function exportAllICS(eventList: Event[]): void {
  eventList.forEach((ev) => exportICS(ev))
}

export async function shareEvent(event: Event): Promise<void> {
  const text = `${event.title} — ${event.date}\n${event.category} · ${event.format}\nSKPI: ${event.skpi}\nDaftar di UNESA Event Hub`
  if (navigator.share) {
    try {
      await navigator.share({ title: event.title, text })
    } catch {
      // User cancelled share dialog
    }
  } else {
    await navigator.clipboard?.writeText(text)
  }
}
