const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');

const tmdbRoutes = require('./tmdbRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// TMDB API routes
app.use('/api/tmdb', tmdbRoutes);

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM movies ORDER BY rating DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single movie by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search movies
app.get('/api/movies/search/:query', async (req, res) => {
  try {
    const search = `%${req.params.query}%`;
    const [rows] = await pool.query(
      'SELECT * FROM movies WHERE title LIKE ? OR genre LIKE ? OR director LIKE ?',
      [search, search, search]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new movie
app.post('/api/movies', async (req, res) => {
  try {
    const { title, genre, release_year, director, description, poster_url, rating } = req.body;
    const [result] = await pool.query(
      'INSERT INTO movies (title, genre, release_year, director, description, poster_url, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, genre, release_year, director, description, poster_url, rating]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a movie
app.put('/api/movies/:id', async (req, res) => {
  try {
    const { title, genre, release_year, director, description, poster_url, rating } = req.body;
    await pool.query(
      'UPDATE movies SET title=?, genre=?, release_year=?, director=?, description=?, poster_url=?, rating=? WHERE id=?',
      [title, genre, release_year, director, description, poster_url, rating, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a movie
app.delete('/api/movies/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM movies WHERE id = ?', [req.params.id]);
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
