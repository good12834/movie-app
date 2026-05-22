import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <nav style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="sticky top-0 z-50 bg-[#0d0d18] border-b border-purple-900/20"
    >
      {/* gradient accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="flex items-center justify-between gap-6 px-6 h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 no-underline group">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-violet-600 to-indigo-600
                          flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.4)]">
            <span className="material-icons text-white text-[18px]">movie</span>
          </div>
          <span
            className="text-[19px] font-bold tracking-tight bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            MovieHub
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies, shows, actors…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`
                w-full h-10 rounded-xl px-4 pr-11 text-[13.5px] text-slate-200
                bg-white/5 border placeholder-slate-500/60
                outline-none transition-all duration-200
                ${focused
                  ? 'border-violet-500/55 bg-violet-600/8 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]'
                  : 'border-violet-400/20 hover:border-violet-400/30'}
              `}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition-colors"
            >
              <span className="material-icons text-[17px]">search</span>
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {[
            { icon: 'bookmark_border', label: 'Watchlist' },
            { icon: 'notifications_none', label: 'Notifications' },
          ].map(({ icon, label }) => (
            <button
              key={icon}
              aria-label={label}
              className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center
                         bg-white/[0.04] border border-white/[0.06] text-slate-400/70
                         hover:bg-violet-600/15 hover:border-violet-500/30 hover:text-violet-300
                         transition-all duration-150"
            >
              <span className="material-icons text-[18px]">{icon}</span>
            </button>
          ))}

          {/* Avatar */}
          <div className="w-[34px] h-[34px] rounded-full ml-1 cursor-pointer
                          bg-gradient-to-br from-violet-600 to-indigo-600
                          border-2 border-violet-500/40 hover:border-violet-500
                          flex items-center justify-center text-white text-[11px] font-bold
                          transition-colors duration-150"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            JD
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar