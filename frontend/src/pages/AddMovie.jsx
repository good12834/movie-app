import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddMovie() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    release_year: '',
    director: '',
    description: '',
    poster_url: '',
    rating: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title || !formData.genre || !formData.release_year) {
      setError('Please fill in all required fields.')
      return
    }

    try {
      await axios.post('/api/movies', {
        ...formData,
        release_year: parseInt(formData.release_year),
        rating: parseFloat(formData.rating) || 0
      })
      navigate('/')
    } catch (err) {
      setError('Failed to add movie. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button
        onClick={() => navigate('/')}
        className="text-slate-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
      >
        ← Back to Movies
      </button>

      <h1 className="text-3xl font-bold text-white mb-8">Add New Movie</h1>

      {error && (
        <div className="bg-red-600/20 border border-red-600/30 text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            placeholder="Enter movie title"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Genre <span className="text-red-400">*</span>
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select genre</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Crime">Crime</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Release Year <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="release_year"
              value={formData.release_year}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              placeholder="2024"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Director</label>
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              placeholder="Director name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Rating (0-10)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="10"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              placeholder="8.5"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Poster URL</label>
          <input
            type="url"
            name="poster_url"
            value={formData.poster_url}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            placeholder="https://example.com/poster.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-none"
            placeholder="Brief description of the movie..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
        >
          Add Movie
        </button>
      </form>
    </div>
  )
}

export default AddMovie
