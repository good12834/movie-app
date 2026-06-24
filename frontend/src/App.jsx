import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import MovieDetail from './pages/MovieDetail/MovieDetail.jsx';
import Search from './pages/Search.jsx';
import AddMovie from './pages/AddMovie.jsx';
import Watchlist from './pages/Watchlist/Watchlist.jsx';
import Category from './pages/Category.jsx';
import Profile from './pages/Profile/Profile.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <main className="flex-1" style={{ paddingTop: 80 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/movies" element={<Category />} />
            <Route path="/shows" element={<Category />} />
            <Route path="/trending" element={<Category />} />
            <Route path="/new" element={<Category />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
