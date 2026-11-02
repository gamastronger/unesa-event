import { Download, Menu, Moon, Sparkles, Sun, X } from 'lucide-react'
import type { NavItem, ViewType } from '@/types'

interface TopbarProps {
  view: ViewType
  setView: (view: ViewType) => void
  navItems: NavItem[]
  savedCount: number
  dark: boolean
  toggleTheme: () => void
  installed: boolean
  onInstallClick: () => void
  menuOpen: boolean
  setMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void
}

export function Topbar({
  view,
  setView,
  navItems,
  savedCount,
  dark,
  toggleTheme,
  installed,
  onInstallClick,
  menuOpen,
  setMenuOpen,
}: TopbarProps) {
  return (
    <header className="topbar">
      <div
        className="brand"
        onClick={() => setView('catalog')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setView('catalog')
          }
        }}
      >
        <span className="brand-mark">
          <Sparkles size={16} />
        </span>
        <span>
          UNESA <strong>Event Hub</strong>
        </span>
      </div>

      <nav className="desktop-nav" aria-label="Navigasi utama">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={view === id ? 'active' : ''}
            onClick={() => setView(id)}
          >
            <Icon size={16} />
            {label}
            {id === 'offline' && savedCount > 0 && (
              <span className="nav-badge">{savedCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="top-actions">
        <button
          className="icon-button"
          aria-label="Ganti tema"
          onClick={toggleTheme}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="install-button" onClick={onInstallClick}>
          <Download size={16} />
          {installed ? 'Terpasang' : 'Install App'}
        </button>
        <button
          className="menu-button"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}

