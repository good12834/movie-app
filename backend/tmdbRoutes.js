const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p';

// Get trending movies
router.get('/trending', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY, page }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get popular movies
router.get('/popular', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: { api_key: TMDB_API_KEY, page }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get top rated movies
router.get('/top-rated', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
      params: { api_key: TMDB_API_KEY, page }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get now playing movies
router.get('/now-playing', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing`, {
      params: { api_key: TMDB_API_KEY, page }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search movies from TMDB
router.get('/search', async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) return res.status(400).json({ error: 'Query parameter is required' });
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: { api_key: TMDB_API_KEY, query, page }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get movie details
router.get('/movie/:id', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${req.params.id}`, {
      params: { api_key: TMDB_API_KEY, append_to_response: 'credits,videos,similar' }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get movie genres list
router.get('/genres', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: { api_key: TMDB_API_KEY }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a random movie
router.get('/random', async (req, res) => {
  try {
    // Pick a random page (TMDB caps at 500)
    const randomPage = Math.floor(Math.random() * 499) + 1;
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        sort_by: 'popularity.desc',
        page: randomPage,
        vote_count_gte: 50,
      }
    });
    const results = response.data.results;
    if (results.length === 0) {
      return res.status(404).json({ error: 'No movies found' });
    }
    const randomMovie = results[Math.floor(Math.random() * results.length)];
    res.json(randomMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
