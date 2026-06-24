
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchFromTMDB } from '../api/tmdb'
import MovieCard from '../components/MovieCard/MovieCard.jsx'

function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (query) searchMovies(1)
  }, [query])

  const searchMovies = async (pageNum) => {
    setLoading(true)
    try {
      const data = await fetchFromTMDB('/search/movie', { query, page: pageNum })
      setMovies(data.results)
      setTotalPages(Math.min(data.total_pages, 500)) // TMDB caps at 500
      setPage(pageNum)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Error searching movies:', err)
    } finally {
      setLoading(false)
    }
  }

  // build the visible page numbers: [1] … [page-1] [page] [page+1] … [last]
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages = new Set([1, totalPages, page, page - 1, page + 1].filter(p => p >= 1 && p <= totalPages))
    return [...pages].sort((a, b) => a - b)
  }

  const pageNumbers = getPageNumbers()

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
        <p className="text-slate-500 text-sm">Searching…</p>
      </div>
    )
  }

  return (
    <div
      className="container mx-auto px-6 py-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* header */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest text-violet-500/60 mb-2">
          Search results
        </p>
        <h1
          className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Results for{' '}
          <span className="text-violet-300">"{query}"</span>
        </h1>
        <p className="text-slate-600 text-xs">
          {movies.length} results found
          {totalPages > 1 && ` across ${totalPages} pages`}
        </p>
      </div>

      <div className="h-px bg-white/[0.04] mb-8" />

      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-2">

              <button
                onClick={() => searchMovies(page - 1)}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs
                           bg-white/[0.04] border border-white/[0.08] text-slate-400
                           hover:bg-violet-500/15 hover:border-violet-500/35 hover:text-violet-300
                           disabled:opacity-30 disabled:cursor-not-allowed
                           transition-all duration-150"
              >
                <span className="material-icons text-[14px]">arrow_back</span>
                Prev
              </button>

              <div className="flex items-center gap-1">
                {pageNumbers.map((num, i) => {
                  const prev = pageNumbers[i - 1]
                  const showEllipsis = prev && num - prev > 1

                  return (
                    <span key={num} className="flex items-center gap-1">
                      {showEllipsis && (
                        <span className="text-slate-700 text-xs px-0.5">…</span>
                      )}
                      <button
                        onClick={() => searchMovies(num)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs
                                    transition-all duration-150
                                    ${num === page
                                      ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300 font-medium'
                                      : 'text-slate-600 hover:bg-white/[0.05] hover:text-slate-300'
                                    }`}
                      >
                        {num}
                      </button>
                    </span>
                  )
                })}
              </div>

              <button
                onClick={() => searchMovies(page + 1)}
                disabled={page >= totalPages}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs
                           bg-white/[0.04] border border-white/[0.08] text-slate-400
                           hover:bg-violet-500/15 hover:border-violet-500/35 hover:text-violet-300
                           disabled:opacity-30 disabled:cursor-not-allowed
                           transition-all duration-150"
              >
                Next
                <span className="material-icons text-[14px]">arrow_forward</span>
              </button>
            </div>
          )}
        </>
      ) : (
        /* empty state */
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-violet-900/20 border border-violet-500/15
                          flex items-center justify-center">
            <span className="material-icons text-2xl text-violet-700">search_off</span>
          </div>
          <div className="text-center">
            <p className="text-slate-300 font-medium mb-1">No results found</p>
            <p className="text-slate-600 text-sm">
              Nothing matched <span className="text-slate-500">"{query}"</span> — try a different title or keyword.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search