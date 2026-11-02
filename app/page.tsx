'use client'

import { useState } from 'react'
import type { Event, ViewType } from '@/types'
import {
  events,
  eventFilters,
  navItems,
  exportICS,
  exportAllICS,
  shareEvent,
} from '@/lib/events-data'
import { useOfflineStorage } from '@/hooks/use-offline-storage'
import { useTheme } from '@/hooks/use-theme'
import { useEventFilters } from '@/hooks/use-event-filters'

// Layout Components
import { Topbar } from '@/components/layout/topbar'
import { MobileNav } from '@/components/layout/mobile-nav'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { OfflineBanner } from '@/components/layout/offline-banner'
import { Footer } from '@/components/layout/footer'

// Feature Components
import { HeroSection } from '@/components/features/hero/hero-section'
import { MetricsSection } from '@/components/features/metrics/metrics-section'
import { ShowcaseSection } from '@/components/features/showcase/showcase-section'
import { CatalogSection } from '@/components/features/catalog/catalog-section'
import { OfflineView } from '@/components/features/offline/offline-view'
import { CalendarView } from '@/components/features/calendar/calendar-view'
import { GuideView } from '@/components/features/guide/guide-view'
import { EventDetailModal } from '@/components/features/modals/event-detail-modal'

// Feedback Components
import { PwaToast } from '@/components/feedback/pwa-toast'

export default function Page() {
  const [view, setView] = useState<ViewType>('catalog')
  const [selected, setSelected] = useState<Event | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // Custom Hooks
  const { dark, toggleTheme } = useTheme()
  const {
    saved,
    lastSync,
    storageStats,
    toastMessage,
    offline,
    installed,
    toggleSaved,
    resyncOfflineStorage,
    clearOfflineStorage,
    handleInstallClick,
  } = useOfflineStorage()

  const {
    query,
    setQuery,
    filter,
    onlySkpi,
    filteredEvents,
    handleChipClick,
  } = useEventFilters(events)

  const handleNavigateToCatalog = () => {
    setView('catalog')
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  return (
    <div className={`app-shell ${dark ? 'theme-dark' : ''}`}>
      <OfflineBanner show={offline} />

      <Topbar
        view={view}
        setView={setView}
        navItems={navItems}
        savedCount={saved.length}
        dark={dark}
        toggleTheme={toggleTheme}
        installed={installed}
        onInstallClick={handleInstallClick}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <MobileNav
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        view={view}
        setView={setView}
        navItems={navItems}
        savedCount={saved.length}
      />

      {view === 'catalog' && (
        <main>
          <HeroSection onExploreClick={handleNavigateToCatalog} />
          <MetricsSection />
          <ShowcaseSection
            events={events}
            onSelectEvent={setSelected}
            onViewAllClick={handleNavigateToCatalog}
          />
          <CatalogSection
            events={filteredEvents}
            filters={eventFilters}
            activeFilter={filter}
            onlySkpi={onlySkpi}
            query={query}
            savedIds={saved}
            onQueryChange={setQuery}
            onClearQuery={() => setQuery('')}
            onChipClick={handleChipClick}
            onToggleSaved={toggleSaved}
            onExportICS={exportICS}
            onShare={shareEvent}
            onSelectEvent={setSelected}
          />
        </main>
      )}

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

      {view === 'calendar' && (
        <CalendarView
          onExportICS={() => exportAllICS(events)}
          onSelectEvent={setSelected}
        />
      )}

      {view === 'guide' && <GuideView />}

      <Footer />

      <MobileBottomNav
        view={view}
        setView={setView}
        navItems={navItems}
        savedCount={saved.length}
      />

      <EventDetailModal
        event={selected}
        isSaved={selected ? saved.includes(selected.id) : false}
        onClose={() => setSelected(null)}
        onToggleSaved={toggleSaved}
      />

      <PwaToast message={toastMessage} />
    </div>
  )
}
