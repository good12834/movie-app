
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { fetchFromTMDB, TMDB_BASE_URL } from '../api/tmdb'
import MovieCard from '../components/MovieCard/MovieCard.jsx'

const TMDB_API_KEY = 'b3a536b1247218e57bee592eb368a777'

const GENRE_IDS = {
  Action: 28, Comedy: 35, Drama: 18, 'Sci-Fi': 878,
  Horror: 27, Romance: 10749, Thriller: 53, Animation: 16,
}

const CATEGORY_CONFIG = {
  '/categories': { title: 'Categories',    endpoint: '/movie/popular' },
  '/movies':    { title: 'Movies',        endpoint: '/movie/popular' },
  '/shows':     { title: 'TV Shows',      endpoint: '/trending/tv/week' },
  '/trending':  { title: 'Trending',      endpoint: '/trending/movie/week' },
  '/new':       { title: 'New & Hot',     endpoint: '/movie/now_playing' },
}

function Category() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const genreFilter = params.get('genre')

  const config = CATEGORY_CONFIG[location.pathname] || CATEGORY_CONFIG['/movies']

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        if (genreFilter && GENRE_IDS[genreFilter]) {
          const url = new URL(`${TMDB_BASE_URL}/discover/movie`)
          url.searchParams.set('api_key', TMDB_API_KEY)
          url.searchParams.set('with_genres', GENRE_IDS[genreFilter])
          url.searchParams.set('sort_by', 'popularity.desc')
          const res = await fetch(url)
          const data = await res.json()
          setMovies(data.results || [])
        } else {
          const data = await fetchFromTMDB(config.endpoint)
          setMovies(data.results || [])
        }
      } catch (err) {
        console.error('Error fetching category:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [config.endpoint, genreFilter])

  const displayTitle = genreFilter ? `${genreFilter} Movies` : config.title

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 bg-black">
        <div className="w-10 h-10 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin" />
        <p className="text-amber-500/60 text-sm font-medium">Loading…</p>
      </div>
    )
  }

  return (
    <div
      className="container mx-auto px-6 py-10 bg-black min-h-screen relative z-10"
      style={{ fontFamily: "'Outfit', 'DM Sans', sans-serif" }}
    >
      <p className="text-[10px] uppercase tracking-widest text-amber-500/60 mb-1 font-medium">Browse</p>
      <h1
        className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {displayTitle}
      </h1>

      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="material-icons text-5xl text-amber-500/30">movie</span>
          <p className="text-slate-400 text-sm">No movies found.</p>
          <Link to="/" className="text-amber-400 text-sm hover:text-amber-300 transition-colors">
            Back to home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} showAddToList />
          ))}
        </div>
      )}
    </div>
  )
}

export default Category
