create database scrollhacks2024;
CREATE TABLE users (
  id INT PRIMARY KEY IDENTITY(1,1),
  name VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE reports (
  id INT PRIMARY KEY IDENTITY(1,1),
  user_id INT,
  report_text TEXT,
  report_date DATETIME DEFAULT GETDATE(),
  location VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE about (
  id INT PRIMARY KEY IDENTITY(1,1),
  title VARCHAR(100),
  content TEXT
);

CREATE TABLE contact (
  id INT PRIMARY KEY IDENTITY(1,1),
  name VARCHAR(50),
  email VARCHAR(100),
  message TEXT
);