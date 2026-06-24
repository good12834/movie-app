import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'moviehub_watchlist'

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setWatchlist(stored)
    } catch {
      setWatchlist([])
    } finally {
      setLoading(false)
    }
  }, [])

  const save = useCallback((items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    setWatchlist(items)
  }, [])

  const add = useCallback((movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev
      const updated = [movie, ...prev]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const remove = useCallback((id) => {
    setWatchlist((prev) => {
      const updated = prev.filter((m) => m.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const toggle = useCallback((movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id)
      const updated = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [movie, ...prev]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clear = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    setWatchlist([])
  }, [])

  const inWatchlist = useCallback(
    (id) => watchlist.some((m) => m.id === id),
    [watchlist]
  )

  const sortWatchlist = useCallback((by) => {
    const sorted = [...watchlist]
    if (by === 'title') {
      sorted.sort((a, b) => a.title?.localeCompare(b.title))
    } else if (by === 'date') {
      sorted.sort((a, b) => {
        const dateA = a.release_date || ''
        const dateB = b.release_date || ''
        return dateB.localeCompare(dateA)
      })
    } else if (by === 'rating') {
      sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
    }
    save(sorted)
  }, [watchlist, save])

  return {
    watchlist,
    loading,
    add,
    remove,
    toggle,
    clear,
    inWatchlist,
    sortWatchlist,
  }
}
