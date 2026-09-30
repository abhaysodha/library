SELECT books.name, SUM(orders.qty) AS total_qty
FROM books
JOIN orders ON books.id = orders.book_id
GROUP BY books.id, books.name
HAVING SUM(orders.qty) > 5;
