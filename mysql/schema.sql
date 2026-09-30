CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT NOT NULL,
  qty INT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id)
) ENGINE=InnoDB;

CREATE INDEX idx_books_category ON books(category); 

