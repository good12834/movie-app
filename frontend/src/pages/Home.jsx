import { useState, useEffect } from 'react'
import { fetchFromTMDB } from '../api/tmdb'
import MovieCard from '../components/MovieCard.jsx'

function Home() {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('trending')

  useEffect(() => { fetchMovies() }, [])

  const fetchMovies = async () => {
    try {
      const [trendingRes, popularRes, topRatedRes, nowPlayingRes] = await Promise.all([
        fetchFromTMDB('/trending/movie/week'),
        fetchFromTMDB('/movie/popular'),
        fetchFromTMDB('/movie/top_rated'),
        fetchFromTMDB('/movie/now_playing'),
      ])
      setTrending(trendingRes.results)
      setPopular(popularRes.results)
      setTopRated(topRatedRes.results)
      setNowPlaying(nowPlayingRes.results)
    } catch (err) {
      console.error('Error fetching movies:', err)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'trending',    label: 'Trending',    icon: 'local_fire_department' },
    { id: 'popular',     label: 'Popular',     icon: 'star' },
    { id: 'top-rated',   label: 'Top Rated',   icon: 'emoji_events' },
    { id: 'now-playing', label: 'Now Playing', icon: 'movie' },
  ]

  const getActiveMovies = () => {
    switch (activeTab) {
      case 'trending':    return trending
      case 'popular':     return popular
      case 'top-rated':   return topRated
      case 'now-playing': return nowPlaying
      default:            return trending
    }
  }

  const hero = trending[0]

  const sectionLabel = tabs.find(t => t.id === activeTab)?.label

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
        <p className="text-slate-500 text-sm tracking-wide">Loading from TMDB…</p>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      {hero && (
        <section className="relative h-[480px] overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
            alt={hero.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          {/* cinematic multi-stop fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/70 via-transparent to-transparent" />

          <div className="relative h-full flex items-end pb-12 px-6 container mx-auto">
            <div className="max-w-xl">
              {/* trending badge */}
              <span className="inline-flex items-center gap-1.5 mb-3
                               bg-violet-500/20 border border-violet-500/35 text-violet-300
                               rounded-full px-3 py-1 text-xs tracking-wide">
                <span className="material-icons text-[13px]">local_fire_department</span>
                Trending this week
              </span>

              <h1
                className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {hero.title}
              </h1>

              <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
                {hero.overview}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                {/* rating pill */}
                <span className="flex items-center gap-1.5 bg-amber-400/15 border border-amber-400/25
                                 text-amber-200 rounded-lg px-3 py-1.5 text-xs font-medium">
                  <span className="material-icons text-[13px]">star</span>
                  {hero.vote_average.toFixed(1)}
                </span>

                <span className="text-slate-500 text-xs">
                  {hero.release_date?.split('-')[0]}
                </span>

                <button
                  className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500
                             text-white text-xs font-medium rounded-lg px-4 py-2
                             transition-colors duration-150"
                >
                  <span className="material-icons text-[14px]">play_arrow</span>
                  Watch trailer
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Tabs + Grid ── */}
      <div className="container mx-auto px-6 py-8">

        {/* Tab pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium
                border transition-all duration-150
                ${activeTab === tab.id
                  ? 'bg-violet-500/20 border-violet-500/45 text-violet-300'
                  : 'bg-white/[0.04] border-white/[0.07] text-slate-400 hover:text-slate-200 hover:bg-white/[0.07]'}
              `}
            >
              <span className="material-icons text-[14px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section heading */}
        <div className="flex items-center justify-between mb-5">
          <h2
            className="text-base font-bold text-slate-200"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {sectionLabel} movies
          </h2>
          <span className="text-xs text-violet-400/80 cursor-pointer hover:text-violet-300">
            See all →
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {getActiveMovies().map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
