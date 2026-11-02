import type { NavItem, ViewType } from '@/types'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  view: ViewType
  setView: (view: ViewType) => void
  navItems: NavItem[]
  savedCount: number
}

export function MobileNav({
  isOpen,
  onClose,
  view,
  setView,
  navItems,
  savedCount,
}: MobileNavProps) {
  if (!isOpen) return null

  return (
    <>
      <div
        className="mobile-nav-backdrop"
        onClick={onClose}
        role="presentation"
      />
      <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu navigasi mobile">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={view === id ? 'active' : ''}
            onClick={() => {
              setView(id)
              onClose()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <Icon size={17} />
              <span>{label}</span>
            </div>
            {id === 'offline' && savedCount > 0 && (
              <span className="mobile-menu-badge">{savedCount}</span>
            )}
          </button>
        ))}
      </div>
    </>
  )
}

