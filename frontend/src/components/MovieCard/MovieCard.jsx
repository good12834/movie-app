// MovieCard.jsx
import { Link } from 'react-router-dom'
import { useWatchlist } from '../../hooks/useWatchlist'
import styles from './Moviecard.module.css'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 53: 'Thriller',
  10752: 'War', 37: 'Western',
}

function MovieCard({ 
  movie, 
  variant = 'default',
  showWatchButton = false,
  showPremiumBadge = false,
  showAddToList = false,
}) {
  const { toggle, inWatchlist } = useWatchlist()
  const posterUrl = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : null

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const year = movie.release_date ? movie.release_date.split('-')[0] : '—'
  const genre = movie.genre_ids?.[0] ? GENRE_MAP[movie.genre_ids[0]] : null

  // Determine card variant class
  const cardVariant = variant === 'featured' ? styles.featured : 
                     variant === 'compact' ? styles.compact : ''

  const handleWatchClick = (e) => {
    e.preventDefault()
    // Handle watch now action
    console.log('Watch now:', movie.title)
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`${styles.movieCard} ${cardVariant}`}
    >
      <div className={styles.card}>
        {/* Poster */}
        <div className={styles.posterContainer}>
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
              className={styles.posterImage}
            />
          ) : (
            <div className={styles.posterPlaceholder}>
              <span className="material-icons">movie</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className={styles.gradientOverlay} />

          {/* Premium Badge */}
          {showPremiumBadge && variant === 'featured' && (
            <div className={styles.premiumBadge}>
              Premium
            </div>
          )}

          {/* Watch Overlay */}
          {showWatchButton && (
            <div className={styles.watchOverlay}>
              <button onClick={handleWatchClick} className={styles.watchButton}>
                <span className="material-icons">play_arrow</span>
                Watch Now
              </button>
            </div>
          )}

          {/* Add to Watchlist */}
          {showAddToList && (
            <button
              onClick={(e) => { e.preventDefault(); toggle(movie) }}
              className={`${styles.watchlistToggle} ${inWatchlist(movie.id) ? styles.inList : ''}`}
              aria-label={inWatchlist(movie.id) ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              <span className="material-icons">
                {inWatchlist(movie.id) ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
          )}

          {/* Genre pill — top left */}
          {genre && (
            <span className={styles.genrePill}>
              {genre}
            </span>
          )}

          {/* Rating badge — top right */}
          <span className={styles.ratingBadge}>
            <span className="material-icons">star</span>
            {rating}
          </span>
        </div>

        {/* Info */}
        <div className={styles.cardInfo}>
          <h3 className={styles.movieTitle}>
            {movie.title}
          </h3>
          <div className={styles.cardFooter}>
            <span className={styles.movieYear}>{year}</span>
            <span className={styles.detailsLink}>
              <span className="material-icons">arrow_forward</span>
              Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard