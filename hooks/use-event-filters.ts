'use client'

import { useState, useMemo, useCallback } from 'react'
import type { Event } from '@/types'
import { isSkpiValid } from '@/lib/events-data'

export function useEventFilters(initialEvents: Event[]) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Semua')
  const [onlySkpi, setOnlySkpi] = useState(false)

  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      const searchTarget = `${event.title} ${event.category} ${event.organizer} ${event.skpi} ${event.format}`.toLowerCase()
      const matchesQuery = searchTarget.includes(query.toLowerCase().trim())

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
    })
  }, [initialEvents, query, filter, onlySkpi])

  const handleChipClick = useCallback((item: string) => {
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
  }, [filter])

  const resetFilters = useCallback(() => {
    setQuery('')
    setFilter('Semua')
    setOnlySkpi(false)
  }, [])

  return {
    query,
    setQuery,
    filter,
    setFilter,
    onlySkpi,
    setOnlySkpi,
    filteredEvents,
    handleChipClick,
    resetFilters,
  }
}

