// MovieDetail.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchFromTMDB, IMG_BASE } from '../../api/tmdb'
import MovieCard from '../../components/MovieCard/MovieCard.jsx'
import { useWatchlist } from '../../hooks/useWatchlist'
import styles from './MovieDetail.module.css'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toggle, inWatchlist } = useWatchlist()

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
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>Loading…</p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className={styles.notFound}>
        <span className={styles.notFoundIcon}>movie_off</span>
        <p className={styles.notFoundTitle}>Movie not found</p>
        <button
          onClick={() => navigate('/')}
          className={styles.notFoundLink}
        >
          ← Back to home
        </button>
      </div>
    )
  }

  const director = movie.credits?.crew?.find(c => c.job === 'Director')
  const cast = movie.credits?.cast?.slice(0, 8) || []
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const similar = movie.similar?.results?.slice(0, 5) || []

  return (
    <div className={styles.movieDetail}>

      {/* ── Backdrop ── */}
      {movie.backdrop_path && (
        <div className={styles.backdropWrapper}>
          <img
            src={`${IMG_BASE}/original${movie.backdrop_path}`}
            alt={movie.title}
            className={styles.backdropImage}
          />
          <div className={styles.backdropOverlay} />
          <div className={styles.backdropOverlayRight} />
        </div>
      )}

      <div className={styles.contentContainer}>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          <span className="material-icons">arrow_back</span>
          Back
        </button>

        <div className={styles.gridLayout}>

          {/* ── Poster ── */}
          <div className={styles.posterWrapper}>
            <div className={styles.posterCard}>
              {movie.poster_path ? (
                <img
                  src={`${IMG_BASE}/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.posterImage}
                />
              ) : (
                <div className={styles.posterPlaceholder}>
                  <span className="material-icons">movie</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Info ── */}
          <div className={styles.infoWrapper}>

            <h1 className={styles.movieTitle}>
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className={styles.movieTagline}>"{movie.tagline}"</p>
            )}

            {/* Meta pills */}
            <div className={styles.metaPills}>
              <span className={styles.ratingPill}>
                <span className="material-icons">star</span>
                {movie.vote_average?.toFixed(1)}/10
              </span>
              <span className={styles.metaPill}>
                <span className="material-icons">calendar_today</span>
                {movie.release_date?.split('-')[0]}
              </span>
              <span className={styles.metaPill}>
                <span className="material-icons">schedule</span>
                {movie.runtime} min
              </span>
              {movie.genres?.map(g => (
                <span key={g.id} className={styles.genrePill}>
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className={styles.overviewBox}>
              <p className={styles.overviewLabel}>Overview</p>
              <p className={styles.overviewText}>{movie.overview}</p>
            </div>

            {/* Stats row */}
            <div className={styles.statsGrid}>
              {[
                { label: 'Director', value: director?.name ?? 'N/A' },
                { label: 'Budget', value: movie.budget ? `$${(movie.budget / 1e6).toFixed(0)}M` : 'N/A' },
                { label: 'Revenue', value: movie.revenue ? `$${(movie.revenue / 1e6).toFixed(0)}M` : 'N/A' },
              ].map(({ label, value }) => (
                <div key={label} className={styles.statCard}>
                  <p className={styles.statLabel}>{label}</p>
                  <p className={styles.statValue}>{value}</p>
                </div>
              ))}
            </div>

            {/* Watchlist toggle */}
            <button
              onClick={() => toggle(movie)}
              className={`${styles.watchlistBtn} ${inWatchlist(movie.id) ? styles.inWatchlist : ''}`}
            >
              <span className="material-icons">
                {inWatchlist(movie.id) ? 'bookmark' : 'bookmark_border'}
              </span>
              {inWatchlist(movie.id) ? 'In Your Watchlist' : 'Add to Watchlist'}
            </button>

            {/* Trailer */}
            {trailer && (
              <div className={styles.trailerSection}>
                <p className={styles.sectionLabel}>Trailer</p>
                <div className={styles.trailerWrapper}>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    className={styles.trailerIframe}
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <div className={styles.castSection}>
                <p className={styles.sectionLabel}>Cast</p>
                <div className={styles.castGrid}>
                  {cast.map(actor => (
                    <div key={actor.id} className={styles.castCard}>
                      {actor.profile_path ? (
                        <img
                          src={`${IMG_BASE}/w185${actor.profile_path}`}
                          alt={actor.name}
                          className={styles.castAvatar}
                        />
                      ) : (
                        <div className={styles.castAvatarPlaceholder}>
                          <span className="material-icons">person</span>
                        </div>
                      )}
                      <p className={styles.castName}>{actor.name}</p>
                      <p className={styles.castCharacter}>{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Similar movies ── */}
        {similar.length > 0 && (
          <div className={styles.similarSection}>
            <div className={styles.similarHeader}>
              <h2 className={styles.similarTitle}>Similar movies</h2>
              <div className={styles.similarDivider} />
            </div>
            <div className={styles.similarGrid}>
              {similar.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetail