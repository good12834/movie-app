// Home.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchFromTMDB } from '../../api/tmdb'
import MovieCard from '../../components/MovieCard/MovieCard.jsx'
import { useWatchlist } from '../../hooks/useWatchlist'
import styles from './Home.module.css'

function Home() {
  const navigate = useNavigate()
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [tvShows, setTvShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const { toggle, inWatchlist } = useWatchlist()
  
  const popularCarouselRef = useRef(null)
  const tvCarouselRef = useRef(null)
  const [popularScrollPosition, setPopularScrollPosition] = useState(0)
  const [tvScrollPosition, setTvScrollPosition] = useState(0)
  const [showPlansModal, setShowPlansModal] = useState(false)
  const [trialActive, setTrialActive] = useState(() => localStorage.getItem('cineverse_trial') === 'active')
  const [showTrialMsg, setShowTrialMsg] = useState(false)

  useEffect(() => { fetchMovies() }, [])

  useEffect(() => {
    // Auto-rotate hero every 6 seconds
    if (trending.length > 0) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % Math.min(trending.length, 5))
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [trending])

  const fetchMovies = async () => {
    try {
      const [trendingRes, popularRes, topRatedRes, nowPlayingRes, tvRes] = await Promise.all([
        fetchFromTMDB('/trending/movie/week'),
        fetchFromTMDB('/movie/popular'),
        fetchFromTMDB('/movie/top_rated'),
        fetchFromTMDB('/movie/now_playing'),
        fetchFromTMDB('/trending/tv/week'),
      ])
      setTrending(trendingRes.results)
      setPopular(popularRes.results)
      setTopRated(topRatedRes.results)
      setNowPlaying(nowPlayingRes.results)
      setTvShows(tvRes.results)
    } catch (err) {
      console.error('Error fetching movies:', err)
    } finally {
      setLoading(false)
    }
  }

  const hero = trending[currentHeroIndex] || trending[0]

  // Carousel navigation functions
  const scrollCarousel = (ref, direction, setScrollPosition) => {
    if (ref.current) {
      const container = ref.current
      const track = container.children[0]
      const firstCard = track?.children[0]
      const cardWidth = firstCard?.offsetWidth || 200
      const gap = 16
      const scrollAmount = (cardWidth + gap) * 1
      
      const newPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
      
      setScrollPosition(newPosition)
    }
  }

  const canScrollLeft = (ref, scrollPosition) => scrollPosition > 0
  const canScrollRight = (ref, scrollPosition, totalItems) => {
    if (!ref.current) return false
    const container = ref.current
    const maxScroll = container.scrollWidth - container.clientWidth
    return scrollPosition < maxScroll - 10
  }

  const getItemsPerView = () => {
    if (window.innerWidth >= 1536) return 6
    if (window.innerWidth >= 1280) return 5
    if (window.innerWidth >= 1024) return 4
    if (window.innerWidth >= 768) return 3
    if (window.innerWidth >= 640) return 2.5
    return 2
  }

  const itemsPerView = getItemsPerView()
  const popularItems = popular.slice(0, 15)
  const tvItems = tvShows.slice(0, 15)

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner} />
          <p className={styles.loadingText}>Loading the universe...</p>
          <div className={styles.loadingBar}>
            <div className={styles.loadingBarFill} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.home}>

      {/* ── HERO SECTION ── */}
      {hero && (
        <section className={styles.heroSection}>
          {/* Background with parallax effect */}
          <div className={styles.heroBackgroundWrapper}>
            <img
              src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
              alt={hero.title}
              className={styles.heroBackground}
            />
            <div className={styles.heroBackgroundOverlay} />
          </div>
          
          {/* Gradient overlays */}
          <div className={styles.heroOverlay} />
          <div className={styles.heroOverlayBottom} />

          {/* Hero content */}
          <div className={styles.heroContent}>
            <div className={styles.heroInner}>
              {/* Badge */}
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} />
                <span>Now Playing</span>
                <span className={styles.heroBadgeSeparator}>•</span>
                <span className={styles.heroBadgeRating}>
                  <span className="material-icons">star</span>
                  {hero.vote_average?.toFixed(1) || 'N/A'}
                </span>
              </div>

              {/* Title */}
              <h1 className={styles.heroTitle}>
                {hero.title}
              </h1>
              
              {/* Metadata */}
              <div className={styles.heroMeta}>
                <span>{hero.release_date?.split('-')[0] || 'N/A'}</span>
                <span className={styles.heroMetaDot}>•</span>
                <span>{hero.original_language?.toUpperCase() || 'EN'}</span>
                <span className={styles.heroMetaDot}>•</span>
                <span className={styles.heroMetaRuntime}>2h 15m</span>
              </div>

              {/* Tagline */}
              <p className={styles.heroTagline}>
                {hero.overview}
              </p>

              {/* Buttons */}
              <div className={styles.heroButtons}>
                <button className={styles.btnWatch} onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(hero.title + ' trailer')}`, '_blank')}>
                  <span className="material-icons">play_arrow</span>
                  Watch Trailer
                </button>
                <button className={`${styles.btnMyList} ${inWatchlist(hero.id) ? styles.inWatchlist : ''}`} onClick={() => toggle(hero)}>
                  <span className="material-icons">{inWatchlist(hero.id) ? 'bookmark' : 'add'}</span>
                  {inWatchlist(hero.id) ? 'Saved' : 'My List'}
                </button>
                <button className={styles.btnInfo} onClick={() => navigate(`/movie/${hero.id}`)}>
                  <span className="material-icons">info</span>
                </button>
              </div>

              {/* Hero indicators */}
              <div className={styles.heroIndicators}>
                {trending.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.heroIndicator} ${index === currentHeroIndex ? styles.heroIndicatorActive : ''}`}
                    onClick={() => setCurrentHeroIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll down indicator */}
          <div className={styles.scrollDown}>
            <span className="material-icons">expand_more</span>
          </div>
        </section>
      )}

      {/* ── CATEGORY ROW ── */}
      <section className={styles.categoryRow}>
        <div className={styles.categoryContainer}>
          {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Animation'].map((cat) => (
            <button
              key={cat}
              className={styles.categoryPill}
              onClick={() => navigate(`/categories?genre=${cat}`)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── TRENDING MOVIES CAROUSEL ── */}
      <section className={styles.carouselSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <span className={styles.sectionLabel}>Most Watched</span>
            <h2 className={styles.sectionTitle}>Popular Movies</h2>
          </div>
          <div className={styles.sectionNav}>
            <button 
              className={`${styles.navArrow} ${!canScrollLeft(popularCarouselRef, popularScrollPosition) ? styles.navDisabled : ''}`}
              onClick={() => scrollCarousel(popularCarouselRef, 'left', setPopularScrollPosition)}
              disabled={!canScrollLeft(popularCarouselRef, popularScrollPosition)}
            >
              <span className="material-icons">chevron_left</span>
            </button>
            <button 
              className={`${styles.navArrow} ${!canScrollRight(popularCarouselRef, popularScrollPosition, popularItems.length) ? styles.navDisabled : ''}`}
              onClick={() => scrollCarousel(popularCarouselRef, 'right', setPopularScrollPosition)}
              disabled={!canScrollRight(popularCarouselRef, popularScrollPosition, popularItems.length)}
            >
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
        </div>
        <div 
          className={styles.carouselContainer}
          ref={popularCarouselRef}
          onScroll={(e) => setPopularScrollPosition(e.target.scrollLeft)}
        >
          <div className={styles.carouselTrack}>
            {popularItems.map((movie, index) => (
              <div key={movie.id} className={styles.carouselItem}>
                <div className={styles.carouselItemRank}>{index + 1}</div>
                <MovieCard movie={movie} showAddToList />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── TRENDING TV SHOWS CAROUSEL ── */}
      <section className={styles.carouselSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <span className={styles.sectionLabel}>Binge Worthy</span>
            <h2 className={styles.sectionTitle}>TV Shows</h2>
          </div>
          <div className={styles.sectionNav}>
            <button 
              className={`${styles.navArrow} ${!canScrollLeft(tvCarouselRef, tvScrollPosition) ? styles.navDisabled : ''}`}
              onClick={() => scrollCarousel(tvCarouselRef, 'left', setTvScrollPosition)}
              disabled={!canScrollLeft(tvCarouselRef, tvScrollPosition)}
            >
              <span className="material-icons">chevron_left</span>
            </button>
            <button 
              className={`${styles.navArrow} ${!canScrollRight(tvCarouselRef, tvScrollPosition, tvItems.length) ? styles.navDisabled : ''}`}
              onClick={() => scrollCarousel(tvCarouselRef, 'right', setTvScrollPosition)}
              disabled={!canScrollRight(tvCarouselRef, tvScrollPosition, tvItems.length)}
            >
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
        </div>
        <div 
          className={styles.carouselContainer}
          ref={tvCarouselRef}
          onScroll={(e) => setTvScrollPosition(e.target.scrollLeft)}
        >
          <div className={styles.carouselTrack}>
            {tvItems.map((show, index) => (
              <div key={show.id} className={styles.carouselItem}>
                <div className={styles.carouselItemRank}>{index + 1}</div>
                <MovieCard movie={show} showAddToList />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM EXPERIENCE ── */}
      <section className={styles.premiumSection}>
        <div className={styles.premiumContainer}>
          <div className={styles.premiumContent}>
            <div className={styles.premiumBadge}>
              <span className="material-icons">workspace_premium</span>
              Premium Experience
            </div>
            <h2 className={styles.premiumTitle}>
              Unlimited <span>Entertainment</span>
            </h2>
            <p className={styles.premiumDesc}>
              Access thousands of movies and shows in stunning 4K quality. 
              Watch anywhere, anytime, on any device. Cancel or change your plan at any time.
            </p>
            <div className={styles.premiumFeatures}>
              <div className={styles.premiumFeature}>
                <span className="material-icons">check_circle</span>
                4K Ultra HD & HDR
              </div>
              <div className={styles.premiumFeature}>
                <span className="material-icons">check_circle</span>
                Watch on any device
              </div>
              <div className={styles.premiumFeature}>
                <span className="material-icons">check_circle</span>
                Cancel anytime
              </div>
            </div>
            <div className={styles.premiumButtons}>
              <button className={styles.btnPremium} onClick={() => {
                if (!trialActive) {
                  localStorage.setItem('cineverse_trial', 'active')
                  setTrialActive(true)
                  setShowTrialMsg(true)
                  setTimeout(() => setShowTrialMsg(false), 4000)
                }
              }}>
                {trialActive ? 'Trial Active' : 'Start Free Trial'}
                <span className="material-icons">arrow_forward</span>
              </button>
              <button className={styles.btnViewPlans} onClick={() => setShowPlansModal(true)}>
                View Plans
              </button>
            </div>
            <div className={styles.premiumFooter}>
              <span className="material-icons">verified</span>
              Free trial for 7 days. No commitment, cancel anytime.
            </div>
          </div>
          <div className={styles.premiumVisual}>
            <div className={styles.premiumCard}>
              <div className={styles.premiumCardIcon}>
                <span className="material-icons">4k</span>
              </div>
              <h3 className={styles.premiumCardTitle}>4K Ultra HD</h3>
              <p className={styles.premiumCardDesc}>
                Watch in stunning 4K quality with HDR support. 
                Available on all your devices.
              </p>
              <div className={styles.premiumCardBadge}>Popular</div>
            </div>
          </div>
        </div>
      </section>
      {/* ── STATS SECTION ── */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10K+</span>
            <span className={styles.statLabel}>Movies & Shows</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4K</span>
            <span className={styles.statLabel}>Ultra HD Quality</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>24/7</span>
            <span className={styles.statLabel}>Streaming Access</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>99%</span>
            <span className={styles.statLabel}>Uptime Guarantee</span>
          </div>
        </div>
      </section>

      {/* Trial started toast */}
      {showTrialMsg && (
        <div className={styles.trialToast}>
          <span className="material-icons">check_circle</span>
          7-day free trial started! Explore all premium features.
        </div>
      )}

      {/* Plans Modal */}
      {showPlansModal && (
        <div className={styles.overlay} onClick={() => setShowPlansModal(false)}>
          <div className={styles.plansModal} onClick={e => e.stopPropagation()}>
            <div className={styles.plansHeader}>
              <h2 className={styles.plansTitle}>Choose Your Plan</h2>
              <button className={styles.plansClose} onClick={() => setShowPlansModal(false)} aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className={styles.plansGrid}>
              {[
                { name: 'Basic', price: '$9.99', quality: 'HD Ready', devices: '1 device' },
                { name: 'Standard', price: '$14.99', quality: 'Full HD', devices: '2 devices', popular: true },
                { name: 'Premium', price: '$19.99', quality: '4K Ultra HD + HDR', devices: '4 devices' },
              ].map(plan => (
                <div key={plan.name} className={`${styles.planCard} ${plan.popular ? styles.planCardPopular : ''}`}>
                  {plan.popular && <div className={styles.planBadge}>Most Popular</div>}
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <div className={styles.planPrice}>
                    <span className={styles.planPriceValue}>{plan.price}</span>
                    <span className={styles.planPricePeriod}>/month</span>
                  </div>
                  <ul className={styles.planFeatures}>
                    <li><span className="material-icons">check</span> {plan.quality}</li>
                    <li><span className="material-icons">check</span> {plan.devices}</li>
                    <li><span className="material-icons">check</span> Cancel anytime</li>
                    <li><span className="material-icons">check</span> No ads</li>
                  </ul>
                  <button className={styles.planCta} onClick={() => { setShowPlansModal(false); setShowTrialMsg(true); setTimeout(() => setShowTrialMsg(false), 4000) }}>
                    {plan.name === 'Premium' ? 'Start Free Trial' : 'Choose Plan'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home