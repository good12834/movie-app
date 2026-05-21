import { useState, useEffect } from 'react';
import { fetchFromTMDB } from '../api/tmdb';
import MovieCard from '../components/MovieCard.jsx';

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trending');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const [trendingRes, popularRes, topRatedRes, nowPlayingRes] = await Promise.all([
        fetchFromTMDB('/trending/movie/week'),
        fetchFromTMDB('/movie/popular'),
        fetchFromTMDB('/movie/top_rated'),
        fetchFromTMDB('/movie/now_playing'),
      ]);
      setTrending(trendingRes.results);
      setPopular(popularRes.results);
      setTopRated(topRatedRes.results);
      setNowPlaying(nowPlayingRes.results);
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'trending', label: 'Trending', icon: 'local_fire_department' },
    { id: 'popular', label: 'Popular', icon: 'star' },
    { id: 'top-rated', label: 'Top Rated', icon: 'emoji_events' },
    { id: 'now-playing', label: 'Now Playing', icon: 'movie' },
  ];

  const getActiveMovies = () => {
    switch (activeTab) {
      case 'trending': return trending;
      case 'popular': return popular;
      case 'top-rated': return topRated;
      case 'now-playing': return nowPlaying;
      default: return trending;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading movies from TMDB...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      {trending.length > 0 && (
        <section className="relative h-[450px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${trending[0].backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-3">{trending[0].title}</h1>
              <p className="text-slate-300 text-lg mb-4 line-clamp-3">{trending[0].overview}</p>
              <div className="flex items-center gap-4">
                <span className="rating-badge px-3 py-1 rounded-md font-bold text-white flex items-center gap-1">
                  <span className="material-icons text-sm">star</span>
                  {trending[0].vote_average.toFixed(1)}
                </span>
                <span className="text-slate-400">
                  {trending[0].release_date?.split('-')[0]}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
              }`}
            >
              <span className="material-icons">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {getActiveMovies().map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
