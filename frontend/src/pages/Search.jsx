import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import MovieCard from '../components/MovieCard.jsx'

function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (query) {
      searchMovies(1)
    }
  }, [query])

  const searchMovies = async (pageNum) => {
    setLoading(true)
    try {
      const res = await axios.get('/api/tmdb/search', {
        params: { query, page: pageNum }
      })
      setMovies(res.data.results)
      setTotalPages(res.data.total_pages)
      setPage(pageNum)
    } catch (err) {
      console.error('Error searching movies:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Searching...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">
        Search Results for "<span className="text-indigo-400">{query}</span>"
      </h1>
      <p className="text-slate-400 mb-8">{movies.length} results found</p>

      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-10">
              <button
                onClick={() => searchMovies(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-slate-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => searchMovies(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <span className="material-icons text-4xl mb-4">search_off</span>
          <p className="text-slate-400 text-lg">No movies found for "{query}"</p>
        </div>
      )}
    </div>
  )
}

export default Search
