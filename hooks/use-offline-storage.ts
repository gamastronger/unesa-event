'use client'

import { useEffect, useState, useCallback } from 'react'
import type { StorageStats } from '@/types'
import {
  events,
  STORAGE_KEY_LAST_SYNC,
  STORAGE_KEY_OFFLINE_EVENTS,
  STORAGE_KEY_SAVED_IDS,
} from '@/lib/events-data'

export function useOfflineStorage() {
  const [saved, setSaved] = useState<string[]>(['pkm', 'gemastik'])
  const [lastSync, setLastSync] = useState<string>('')
  const [storageStats, setStorageStats] = useState<StorageStats>({
    usageMB: 1.5,
    quotaMB: 50,
    percent: 3,
  })
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [offline, setOffline] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  // Measure local storage quota and usage
  const measureStorage = useCallback(() => {
    if (typeof window !== 'undefined' && navigator.storage && navigator.storage.estimate) {
      navigator.storage
        .estimate()
        .then(({ usage = 0, quota = 52428800 }) => {
          const usageMB = +(usage / (1024 * 1024)).toFixed(1)
          const quotaMB = +(quota / (1024 * 1024)).toFixed(0)
          const percent = Math.min(100, Math.max(1, Math.round((usage / quota) * 100)))
          setStorageStats({ usageMB, quotaMB, percent })
        })
        .catch(() => {})
    }
  }, [])

  // Core offline storage persistence and Service Worker sync
  const saveAndSync = useCallback((newSavedIds: string[], toastNotice?: string) => {
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
        navigator.serviceWorker.ready
          .then((reg) => {
            reg.active?.postMessage({
              type: 'SYNC_OFFLINE_EVENTS',
              payload: {
                savedIds: newSavedIds,
                events: currentSavedEvents,
                timestamp: Date.now(),
              },
            })
          })
          .catch(() => {})
      }

      measureStorage()
    } catch (err) {
      console.error('[PWA] Failed to update offline storage:', err)
    }

    if (toastNotice) {
      setToastMessage(toastNotice)
      if ((window as any)._pwaToastTimer) clearTimeout((window as any)._pwaToastTimer)
      ;(window as any)._pwaToastTimer = setTimeout(() => setToastMessage(null), 3200)
    }
  }, [measureStorage])

  useEffect(() => {
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
  }, [measureStorage])

  const toggleSaved = useCallback((id: string) => {
    setSaved((prevSaved) => {
      const isCurrentlySaved = prevSaved.includes(id)
      const newSaved = isCurrentlySaved
        ? prevSaved.filter((item) => item !== id)
        : [...prevSaved, id]
      const eventObj = events.find((e) => e.id === id)
      const eventName = eventObj ? `"${eventObj.title}"` : 'Acara'

      if (isCurrentlySaved) {
        saveAndSync(newSaved, `${eventName} dihapus dari penyimpanan offline.`)
      } else {
        saveAndSync(newSaved, `${eventName} berhasil disimpan offline!`)
      }
      return newSaved
    })
  }, [saveAndSync])

  const resyncOfflineStorage = useCallback(() => {
    saveAndSync(saved, 'Semua acara offline berhasil disinkronkan ulang!')
  }, [saveAndSync, saved])

  const clearOfflineStorage = useCallback(() => {
    if (typeof window !== 'undefined' && window.confirm('Hapus semua acara yang tersimpan offline?')) {
      saveAndSync([], 'Penyimpanan offline berhasil dibersihkan.')
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then((reg) => {
            reg.active?.postMessage({ type: 'CLEAR_OFFLINE_EVENTS' })
          })
          .catch(() => {})
      }
    }
  }, [saveAndSync])

  const handleInstallClick = useCallback(async () => {
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
  }, [deferredPrompt])

  return {
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
  }
}
