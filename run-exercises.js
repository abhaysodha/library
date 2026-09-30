import { items } from './data.js';
import { availableNames, totalStockValue, updatedBook, others, createLimiter, loadDashboard, Book, EBook } from './exercises.js';

console.log('A1 names:', availableNames);
console.log('A1 total stock value:', totalStockValue);
console.log('A1 updated book:', updatedBook);
console.log('A1 others:', others);
const limiter = createLimiter(3);
console.log('A2 uses:', [1, 2, 3, 4, 5].map(() => limiter.use()));
console.log('A2 remaining:', limiter.remaining());
limiter.reset();
console.log('A2 remaining after reset:', limiter.remaining());
await loadDashboard();
await loadDashboard(true);
const { id, name, price } = items[0];
console.log('A4 Book, 10% off:', new Book(id, name, price).discountedPrice(10));
console.log('A4 EBook, 10% plus 5% off:', new EBook(id, name, price, 12).discountedPrice(10));
