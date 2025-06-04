CREATE DATABASE IF NOT EXISTS book_library CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE book_library;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role)
VALUES (
  'Admin',
  'admin@example.com',
  -- Passwort: admin123 (hashed with bcrypt)
  '$2y$10$1UzXVfrOEdsjFql67/Mp2Oahd9YRY1O1yiEdMzoeAIuNyLcAfsr3u',
  'admin'
);

CREATE TABLE password_resets (
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  PRIMARY KEY (email)
);