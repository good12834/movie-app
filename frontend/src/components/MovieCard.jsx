
import { Link } from 'react-router-dom'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 53: 'Thriller',
  10752: 'War', 37: 'Western',
}

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : null

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const year = movie.release_date ? movie.release_date.split('-')[0] : '—'
  const genre = movie.genre_ids?.[0] ? GENRE_MAP[movie.genre_ids[0]] : null

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="no-underline group block"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div
        className="rounded-xl overflow-hidden bg-[#13131f] border border-white/[0.06]
                   transition-all duration-200 h-full
                   group-hover:-translate-y-1 group-hover:border-violet-500/35"
      >
        {/* Poster */}
        <div className="relative w-full overflow-hidden bg-[#1a1a2e]"
             style={{ aspectRatio: '2/3' }}>

          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-icons text-5xl text-violet-900/40">movie</span>
            </div>
          )}

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#13131f] via-[#13131f]/40 to-transparent" />

          {/* genre pill — top left */}
          {genre && (
            <span className="absolute top-2.5 left-2.5
                             bg-violet-500/25 border border-violet-500/35 text-violet-300
                             rounded-full px-2.5 py-0.5 text-[10px]">
              {genre}
            </span>
          )}

          {/* rating badge — top right */}
          <span className="absolute top-2.5 right-2.5
                           flex items-center gap-1
                           bg-black/60 border border-amber-400/25 text-amber-200
                           rounded-md px-1.5 py-0.5 text-[11px] font-medium
                           backdrop-blur-sm">
            <span className="material-icons text-amber-400" style={{ fontSize: 12 }}>star</span>
            {rating}
          </span>
        </div>

        {/* Info */}
        <div className="px-3 py-2.5">
          <h3
            className="text-slate-200 text-[13px] font-bold truncate mb-1.5 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {movie.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-600">{year}</span>
            <span className="flex items-center gap-0.5 text-[10.5px] text-violet-500/70
                             group-hover:text-violet-400 transition-colors duration-150">
              <span className="material-icons" style={{ fontSize: 12 }}>arrow_forward</span>
              Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard