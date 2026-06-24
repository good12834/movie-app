// Watchlist.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWatchlist } from '../../hooks/useWatchlist'
import styles from './Watchlist.module.css'

function Watchlist() {
  const { watchlist, remove, clear, sortWatchlist } = useWatchlist()
  const [sortBy, setSortBy] = useState('date')

  const handleSort = (by) => {
    setSortBy(by)
    sortWatchlist(by)
  }

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      clear()
    }
  }

  return (
    <div className={styles.watchlist}>
      <div className={styles.watchlistContainer}>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.headerLabel}>My list</p>
          <h1 className={styles.headerTitle}>My Watchlist</h1>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar}>
          <span className={styles.statsCount}>
            <span>{watchlist.length}</span> {watchlist.length === 1 ? 'movie' : 'movies'} in your watchlist
          </span>
          <span className={styles.statsDivider} />
          <div className={styles.statsActions}>
            <div className={styles.sortGroup}>
              <button
                className={`${styles.statsAction} ${sortBy === 'date' ? styles.activeSort : ''}`}
                onClick={() => handleSort('date')}
              >
                <span className="material-icons" style={{ fontSize: '14px' }}>calendar_today</span>
                Date
              </button>
              <button
                className={`${styles.statsAction} ${sortBy === 'title' ? styles.activeSort : ''}`}
                onClick={() => handleSort('title')}
              >
                <span className="material-icons" style={{ fontSize: '14px' }}>sort_by_alpha</span>
                Title
              </button>
              <button
                className={`${styles.statsAction} ${sortBy === 'rating' ? styles.activeSort : ''}`}
                onClick={() => handleSort('rating')}
              >
                <span className="material-icons" style={{ fontSize: '14px' }}>star</span>
                Rating
              </button>
            </div>
            {watchlist.length > 0 && (
              <button
                className={`${styles.statsAction} ${styles.statsActionDanger}`}
                onClick={clearAll}
              >
                <span className="material-icons" style={{ fontSize: '14px' }}>delete_outline</span>
                Clear All
              </button>
            )}
          </div>
        </div>

        {watchlist.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={`material-icons ${styles.emptyIcon}`}>bookmark_border</span>
            <p className={styles.emptyTitle}>Your watchlist is empty.</p>
            <Link to="/" className={styles.emptyLink}>
              Browse movies
            </Link>
          </div>
        ) : (
          <div className={styles.movieGrid}>
            {watchlist.map((movie, index) => (
              <div key={movie.id} className={styles.movieCardWrapper}>
                <Link to={`/movie/${movie.id}`} className={styles.movieCard}>
                  <div className={styles.posterWrapper}>
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className={styles.posterImage}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.posterPlaceholder}>
                        <span className="material-icons">movie</span>
                      </div>
                    )}
                    <span className={styles.rankBadge}>#{index + 1}</span>
                  </div>
                  <div className={styles.movieInfo}>
                    <p className={styles.movieTitle}>{movie.title}</p>
                    <p className={styles.movieYear}>
                      {movie.release_date?.split('-')[0] || 'N/A'}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => remove(movie.id)}
                  className={styles.removeBtn}
                  aria-label={`Remove ${movie.title} from watchlist`}
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Watchlist
