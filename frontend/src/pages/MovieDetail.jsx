
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchFromTMDB, IMG_BASE } from '../api/tmdb'
import MovieCard from '../components/MovieCard.jsx'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchMovie() }, [id])

  const fetchMovie = async () => {
    try {
      const data = await fetchFromTMDB(`/movie/${id}`, {
        append_to_response: 'credits,videos,similar',
      })
      setMovie(data)
    } catch (err) {
      console.error('Error fetching movie:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
        <p className="text-slate-500 text-sm">Loading…</p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <span className="material-icons text-5xl text-violet-900/40 mb-4 block">movie_off</span>
        <p className="text-slate-400 text-lg mb-4">Movie not found</p>
        <button
          onClick={() => navigate('/')}
          className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
        >
          ← Back to home
        </button>
      </div>
    )
  }

  const director = movie.credits?.crew?.find(c => c.job === 'Director')
  const cast      = movie.credits?.cast?.slice(0, 8) || []
  const trailer   = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const similar   = movie.similar?.results?.slice(0, 5) || []

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Backdrop ── */}
      {movie.backdrop_path && (
        <div className="relative h-[380px] overflow-hidden">
          <img
            src={`${IMG_BASE}/original${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-6 pb-16 -mt-36 relative z-10">

        {/* back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-slate-500 hover:text-violet-300
                     text-xs mb-8 transition-colors duration-150"
        >
          <span className="material-icons text-[14px]">arrow_back</span>
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* ── Poster ── */}
          <div className="md:col-span-1">
            <div className="rounded-xl overflow-hidden border border-white/[0.07]
                            shadow-[0_24px_48px_rgba(0,0,0,0.55)]">
              <img
                src={movie.poster_path
                  ? `${IMG_BASE}/w500${movie.poster_path}`
                  : null}
                alt={movie.title}
                className="w-full block"
                onError={e => { e.target.style.display = 'none' }}
              />
              {!movie.poster_path && (
                <div className="w-full aspect-[2/3] flex items-center justify-center bg-[#13131f]">
                  <span className="material-icons text-5xl text-violet-900/30">movie</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Info ── */}
          <div className="md:col-span-3">

            <h1
              className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-slate-500 italic text-sm mb-4">"{movie.tagline}"</p>
            )}

            {/* meta pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="flex items-center gap-1.5 bg-amber-400/12 border border-amber-400/22
                               text-amber-200 rounded-md px-2.5 py-1 text-xs font-medium">
                <span className="material-icons text-amber-400" style={{ fontSize: 13 }}>star</span>
                {movie.vote_average?.toFixed(1)}/10
              </span>
              <span className="flex items-center gap-1 text-slate-500 text-xs">
                <span className="material-icons text-[13px]">calendar_today</span>
                {movie.release_date?.split('-')[0]}
              </span>
              <span className="flex items-center gap-1 text-slate-500 text-xs">
                <span className="material-icons text-[13px]">schedule</span>
                {movie.runtime} min
              </span>
              {movie.genres?.map(g => (
                <span key={g.id}
                  className="bg-violet-500/15 border border-violet-500/28 text-violet-300
                             rounded-full px-2.5 py-0.5 text-[10px]">
                  {g.name}
                </span>
              ))}
            </div>

            {/* overview */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mb-5">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-medium">
                Overview
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">{movie.overview}</p>
            </div>

            {/* stats row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Director', value: director?.name ?? 'N/A' },
                { label: 'Budget',   value: movie.budget  ? `$${(movie.budget  / 1e6).toFixed(0)}M` : 'N/A' },
                { label: 'Revenue',  value: movie.revenue ? `$${(movie.revenue / 1e6).toFixed(0)}M` : 'N/A' },
              ].map(({ label, value }) => (
                <div key={label}
                  className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3">
                  <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-1">{label}</p>
                  <p className="text-sm font-medium text-slate-200 truncate">{value}</p>
                </div>
              ))}
            </div>

            {/* trailer */}
            {trailer && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-medium">
                  Trailer
                </p>
                <div className="aspect-video rounded-xl overflow-hidden border border-white/[0.06]">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* cast */}
            {cast.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-medium">
                  Cast
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {cast.map(actor => (
                    <div key={actor.id}
                      className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3 text-center">
                      {actor.profile_path ? (
                        <img
                          src={`${IMG_BASE}/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="w-12 h-12 rounded-full mx-auto mb-2 object-cover
                                     border border-white/[0.07]"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full mx-auto mb-2 bg-violet-900/25
                                        border border-violet-500/15 flex items-center justify-center">
                          <span className="material-icons text-violet-700 text-[18px]">person</span>
                        </div>
                      )}
                      <p className="text-slate-200 text-xs font-medium truncate">{actor.name}</p>
                      <p className="text-slate-600 text-[10px] truncate">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Similar movies ── */}
        {similar.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-base font-bold text-slate-200"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Similar movies
              </h2>
              <div className="h-px flex-1 mx-4 bg-white/[0.04]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {similar.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetail