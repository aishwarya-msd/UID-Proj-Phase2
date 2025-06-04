-- Users table
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

-- Favorites table
CREATE TABLE favorites (
  fav_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  imdb_id VARCHAR(20) NOT NULL,
  movie_title VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE (user_id, imdb_id) -- Prevent duplicate favorites per user
);

-- Reviews table
CREATE TABLE reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  imdb_id VARCHAR(20) NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 10),
  comment TEXT,
  review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
