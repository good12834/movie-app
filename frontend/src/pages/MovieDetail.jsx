import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MovieCard from '../components/MovieCard.jsx'

const IMG_BASE = 'https://image.tmdb.org/t/p'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovie()
  }, [id])

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`/api/tmdb/movie/${id}`)
      setMovie(res.data)
    } catch (err) {
      console.error('Error fetching movie:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-2xl text-slate-400">Movie not found</p>
        <button onClick={() => navigate('/')} className="mt-4 text-indigo-400 hover:underline">
          Back to Home
        </button>
      </div>
    )
  }

  const director = movie.credits?.crew?.find((c) => c.job === 'Director')
  const cast = movie.credits?.cast?.slice(0, 8) || []
  const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube')
  const similar = movie.similar?.results?.slice(0, 5) || []

  return (
    <div>
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div className="relative h-[350px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG_BASE}/original${movie.backdrop_path})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <img
              src={movie.poster_path ? `${IMG_BASE}/w500${movie.poster_path}` : 'https://via.placeholder.com/300x450/1e293b/64748b?text=No+Poster'}
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-3">
            <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
            {movie.tagline && <p className="text-slate-400 italic mb-4">{movie.tagline}</p>}

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="rating-badge px-3 py-1 rounded-md text-sm font-bold text-white flex items-center gap-1">
                <span className="material-icons text-sm">star</span>
                {movie.vote_average?.toFixed(1)}/10
              </span>
              <span className="text-slate-400">{movie.release_date?.split('-')[0]}</span>
              <span className="text-slate-400">{movie.runtime} min</span>
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium border border-indigo-600/30"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
              <p className="text-slate-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Director & Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {director && (
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm">Director</p>
                  <p className="text-white font-medium">{director.name}</p>
                </div>
              )}
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm">Budget</p>
                <p className="text-white font-medium">
                  {movie.budget ? `$${(movie.budget / 1_000_000).toFixed(0)}M` : 'N/A'}
                </p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-400 text-sm">Revenue</p>
                <p className="text-white font-medium">
                  {movie.revenue ? `$${(movie.revenue / 1_000_000).toFixed(0)}M` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Trailer */}
            {trailer && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Trailer</h3>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Cast</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {cast.map((actor) => (
                    <div key={actor.id} className="bg-slate-800 rounded-lg p-3 border border-slate-700 text-center">
                      <img
                        src={actor.profile_path ? `${IMG_BASE}/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278/1e293b/64748b?text=No+Photo'}
                        alt={actor.name}
                        className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                      />
                      <p className="text-white text-sm font-medium line-clamp-1">{actor.name}</p>
                      <p className="text-slate-400 text-xs line-clamp-1">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Similar Movies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {similar.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetail
