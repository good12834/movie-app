// TMDB API Configuration
export const TMDB_API_KEY = 'b3a536b1247218e57bee592eb368a777';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_BASE = 'https://image.tmdb.org/t/p';

export const fetchFromTMDB = async (endpoint, params = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', TMDB_API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error('API request failed');
  return response.json();
};
