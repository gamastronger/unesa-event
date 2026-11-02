'use client'

import { useEffect, useState, useCallback } from 'react'
import { STORAGE_KEY_THEME } from '@/lib/events-data'

export function useTheme() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME)
      if (savedTheme === 'dark') {
        setDark(true)
        document.documentElement.classList.add('dark')
      } else if (savedTheme === 'light') {
        setDark(false)
        document.documentElement.classList.remove('dark')
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDark(true)
        document.documentElement.classList.add('dark')
      }
    } catch {
      // LocalStorage might not be accessible
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
        try {
          localStorage.setItem(STORAGE_KEY_THEME, 'dark')
        } catch {}
      } else {
        document.documentElement.classList.remove('dark')
        try {
          localStorage.setItem(STORAGE_KEY_THEME, 'light')
        } catch {}
      }
      return next
    })
  }, [])

  return { dark, toggleTheme }
}

