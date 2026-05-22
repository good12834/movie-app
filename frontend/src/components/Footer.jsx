import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer
      className="mt-auto bg-[#0d0d18] border-t border-violet-900/15"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* gradient accent line — mirrors the Navbar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/35 to-transparent" />

      <div className="container mx-auto px-6 py-7 flex flex-col gap-5">

        {/* top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline group shrink-0">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-gradient-to-br from-violet-600 to-indigo-600
                            flex items-center justify-center">
              <span className="material-icons text-white text-[15px]">movie</span>
            </div>
            <span
              className="text-base font-bold bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              MovieHub
            </span>
          </Link>

          {/* nav links */}
          <nav className="flex items-center gap-5">
            {[
              { label: 'Home',      icon: 'home',          to: '/' },
              { label: 'Search',    icon: 'search',        to: '/search' },
              { label: 'Watchlist', icon: 'bookmark',      to: '/watchlist' },
            ].map(({ label, icon, to }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-1.5 text-slate-400/60 hover:text-violet-300
                           text-[12.5px] no-underline transition-colors duration-150"
              >
                <span className="material-icons text-[14px]">{icon}</span>
                {label}
              </Link>
            ))}
            
             <a href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400/60 hover:text-violet-300
                         text-[12.5px] no-underline transition-colors duration-150"
            >
              <span className="material-icons text-[14px]">open_in_new</span>
              TMDB
            </a>
          </nav>
        </div>

        {/* divider */}
        <div className="h-px bg-white/[0.05]" />

        {/* bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-slate-600">
            © 2024 MovieHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-600">
              <span className="material-icons text-[13px] text-violet-500/40">storage</span>
              Powered by TMDB
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-slate-600">
              <span className="material-icons text-[13px] text-red-500/50">favorite</span>
              Built with React
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer