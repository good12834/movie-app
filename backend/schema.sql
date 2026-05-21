CREATE DATABASE IF NOT EXISTS movie_app;
USE movie_app;

CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  release_year INT,
  director VARCHAR(255),
  description TEXT,
  poster_url VARCHAR(500),
  rating DECIMAL(3,1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO movies (title, genre, release_year, director, description, poster_url, rating) VALUES
('The Shawshank Redemption', 'Drama', 1994, 'Frank Darabont', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg', 9.3),
('The Godfather', 'Crime', 1972, 'Francis Ford Coppola', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.', 'https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_.jpg', 9.2),
('The Dark Knight', 'Action', 2008, 'Christopher Nolan', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg', 9.0),
('Pulp Fiction', 'Crime', 1994, 'Quentin Tarantino', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_.jpg', 8.9),
('Inception', 'Sci-Fi', 2010, 'Christopher Nolan', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg', 8.8),
('Fight Club', 'Drama', 1999, 'David Fincher', 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', 'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_.jpg', 8.8),
('Forrest Gump', 'Drama', 1994, 'Robert Zemeckis', 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.', 'https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTYtZmU5YS00YjQ5LTljYjgtMjY2NDVhYWU5OGNmXkEyXkFqcGc@._V1_.jpg', 8.8),
('The Matrix', 'Sci-Fi', 1999, 'Lana Wachowski', 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth.', 'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZDYxZjlhZjhkXkEyXkFqcGc@._V1_.jpg', 8.7),
('Interstellar', 'Sci-Fi', 2014, 'Christopher Nolan', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.', 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg', 8.7),
('Goodfellas', 'Crime', 1990, 'Martin Scorsese', 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.', 'https://m.media-amazon.com/images/M/MV5BN2E5NzI2ZGMtY2VjNi00YTRjLWI1MDUtZGY5OWU1MWJjZjRjXkEyXkFqcGc@._V1_.jpg', 8.7),
('Parasite', 'Thriller', 2019, 'Bong Joon-ho', 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', 'https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg', 8.5),
('Avengers: Endgame', 'Action', 2019, 'Anthony Russo', 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.', 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg', 8.4);
