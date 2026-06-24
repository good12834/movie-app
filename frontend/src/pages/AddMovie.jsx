import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const GENRES = ['Action', 'Comedy', 'Crime', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller']

const INITIAL = {
  title: '', genre: '', release_year: '',
  director: '', description: '', poster_url: '', rating: '',
}

function AddMovie() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(INITIAL)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!formData.title || !formData.genre || !formData.release_year) {
      setError('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    try {
      await axios.post('/api/movies', {
        ...formData,
        release_year: parseInt(formData.release_year),
        rating: parseFloat(formData.rating) || 0,
      })
      navigate('/')
    } catch {
      setError('Failed to add movie. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const field = 'w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600/60 outline-none transition-all duration-150 focus:border-amber-500/50 focus:bg-amber-500/[0.03] focus:shadow-[0_0_15px_rgba(212,175,55,0.2),0_0_30px_rgba(212,175,55,0.05)]'

  return (
    <div
      className="container mx-auto px-6 py-10 max-w-xl bg-black min-h-screen relative z-10"
      style={{ fontFamily: "'Outfit', 'DM Sans', sans-serif" }}
    >
      {/* back */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-slate-500 hover:text-amber-400
                   text-xs mb-6 transition-colors duration-150 cursor-pointer"
      >
        <span className="material-icons text-[14px]">arrow_back</span>
        Back to movies
      </button>

      {/* heading */}
      <p className="text-[10px] uppercase tracking-widest text-amber-500/60 mb-1 font-medium">Catalog</p>
      <h1
        className="text-2xl font-extrabold text-white mb-5 tracking-tight"
        style={{ fontFamily: "'Syne', sans-serif", textShadow: '0 0 15px rgba(212,175,55,0.12)' }}
      >
        Add new movie
      </h1>

      {/* error */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-500/[0.08] border border-red-500/25
                        text-red-300 text-xs rounded-lg px-4 py-3 mb-5">
          <span className="material-icons text-[16px] shrink-0">error_outline</span>
          {error}
        </div>
      )}

      <div className="h-px bg-amber-500/10 mb-6" />

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* title */}
        <div>
          <label className="block text-[11px] text-slate-500 mb-1.5 tracking-wide">
            Title <span className="text-red-500/70">*</span>
          </label>
          <input
            type="text" name="title" value={formData.title} onChange={handleChange}
            placeholder="Enter movie title"
            className={field}
          />
        </div>

        {/* genre + year */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-slate-500 mb-1.5 tracking-wide">
              Genre <span className="text-red-500/70">*</span>
            </label>
            <div className="relative">
              <select
                name="genre" value={formData.genre} onChange={handleChange}
                className={`${field} appearance-none pr-8 cursor-pointer`}
              >
                <option value="">Select genre</option>
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <span className="material-icons absolute right-2.5 top-1/2 -translate-y-1/2
                               text-slate-650 text-[16px] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
          <div>
            <label className="block text-[11px] text-slate-500 mb-1.5 tracking-wide">
              Release year <span className="text-red-500/70">*</span>
            </label>
            <input
              type="number" name="release_year" value={formData.release_year} onChange={handleChange}
              placeholder="2024"
              className={field}
            />
          </div>
        </div>

        {/* director + rating */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-slate-500 mb-1.5 tracking-wide">
              Director
            </label>
            <input
              type="text" name="director" value={formData.director} onChange={handleChange}
              placeholder="Director name"
              className={field}
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-500 mb-1.5 tracking-wide">
              Rating <span className="text-slate-700">(0–10)</span>
            </label>
            <input
              type="number" name="rating" value={formData.rating} onChange={handleChange}
              placeholder="8.5" step="0.1" min="0" max="10"
              className={field}
            />
          </div>
        </div>

        {/* poster url */}
        <div>
          <label className="block text-[11px] text-slate-500 mb-1.5 tracking-wide">
            Poster URL
          </label>
          <input
            type="url" name="poster_url" value={formData.poster_url} onChange={handleChange}
            placeholder="https://example.com/poster.jpg"
            className={field}
          />
        </div>

        {/* description */}
        <div>
          <label className="block text-[11px] text-slate-500 mb-1.5 tracking-wide">
            Description
          </label>
          <textarea
            name="description" value={formData.description} onChange={handleChange}
            rows={4} placeholder="Brief description of the movie…"
            className={`${field} resize-none`}
          />
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 mt-2 btn-gold-primary
                     disabled:opacity-50 text-black text-sm font-medium rounded-lg py-3
                     transition-colors duration-150 cursor-pointer"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
              Adding…
            </>
          ) : (
            <>
              <span className="material-icons text-[16px]">add_circle_outline</span>
              Add movie
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-slate-500 font-medium">
          Fields marked <span className="text-red-500/60">*</span> are required
        </p>
      </form>
    </div>
  )
}

export default AddMovie