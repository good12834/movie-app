import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-slate-800/95 border-t border-slate-700 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-icons text-xl text-indigo-400">movie</span>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              MovieHub
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              TMDB API
            </a>
            <span className="flex items-center gap-1">
              <span className="material-icons text-sm">favorite</span>
              Built with React
            </span>
          </div>
          <p className="text-xs text-slate-500">
            © 2024 MovieHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
