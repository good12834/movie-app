import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-white no-underline flex items-center gap-2 shrink-0">
          <span className="material-icons text-3xl">movie</span>
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            MovieHub
          </span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <span className="material-icons">search</span>
            </button>
          </div>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
