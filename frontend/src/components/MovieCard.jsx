import { Link } from 'react-router-dom'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : 'https://via.placeholder.com/300x450/1e293b/64748b?text=No+Poster'

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const year = movie.release_date ? movie.release_date.split('-')[0] : ''

  return (
    <Link to={`/movie/${movie.id}`} className="no-underline">
      <div className="movie-card bg-slate-800 rounded-xl overflow-hidden border border-slate-700 h-full">
        <div className="relative">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-80 object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 rating-badge px-2 py-1 rounded-md text-sm font-bold text-white flex items-center gap-1">
            <span className="material-icons text-sm">star</span>
            {rating}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">{year}</span>
          </div>
          <p className="text-slate-400 text-sm mt-2 line-clamp-2">{movie.overview}</p>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
