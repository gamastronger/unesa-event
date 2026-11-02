import type { NavItem, ViewType } from '@/types'

interface MobileBottomNavProps {
  view: ViewType
  setView: (view: ViewType) => void
  navItems: NavItem[]
  savedCount: number
}

export function MobileBottomNav({
  view,
  setView,
  navItems,
  savedCount,
}: MobileBottomNavProps) {
  const getShortLabel = (id: ViewType) => {
    switch (id) {
      case 'catalog':
        return 'Katalog'
      case 'offline':
        return 'Disimpan'
      case 'calendar':
        return 'Kalender'
      case 'guide':
        return 'Panduan'
      default:
        return ''
    }
  }

  return (
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
              {isOfflineTab && savedCount > 0 && (
                <span className="bottom-nav-badge">{savedCount}</span>
              )}
            </div>
            <span className="bottom-nav-label">{getShortLabel(id)}</span>
          </button>
        )
      })}
    </nav>
  )
}

