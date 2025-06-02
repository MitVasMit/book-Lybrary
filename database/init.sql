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
  '$2y$10$E4ulqIXPr0Tdb.3hAcvSt.F9MvIsc5rCMFSEqazZMGk1K/IBkT8B6',
  'admin'
);