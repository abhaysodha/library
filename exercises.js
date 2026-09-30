import { items, categories, fakeApi } from './data.js';

// A1
export const availableNames = items
  .filter(book => book.price > 400 && book.stock > 0)
  .map(book => book.name);
export const totalStockValue = items.reduce((total, book) => {
  return total + book.price * book.stock;
}, 0);
const book = items.find(book => book.id === 3);
export const updatedBook = { ...book, stock: book.stock + 1 };
const { name, price, ...others } = items[0];
export { others };

// A2
export function createLimiter(max) {
  let used = 0;
  return {
    use() {
      if (used >= max) {
        return false;
      }
      used += 1;
      return true;
    },
    reset() {
      used = 0;
    },
    remaining() {
      return max - used;
    },
  };
}

// A3
export async function loadDashboard(shouldFail = false) {
  try {
    const [books, groups] = await Promise.all([
      fakeApi(items, 100, shouldFail),
      fakeApi(categories, 150),
    ]);
    console.log(`${books.length} books across ${groups.length} categories`);
  } catch (error) {
    console.log(`Failed: ${error.message}`);
  }
}
// output: A, D, C, B.

// A4
export class Book {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
  discountedPrice(pct) {
    const discount = this.price * pct / 100;
    return this.price - discount;
  }
}
export class EBook extends Book {
  constructor(id, name, price, fileSizeMB) {
    super(id, name, price);
    this.fileSizeMB = fileSizeMB;
  }
  discountedPrice(pct) {
    const price = super.discountedPrice(pct);
    return price * 0.95;
  }
}

console.log('A1 names:', availableNames);
console.log('A1 total stock value:', totalStockValue);
console.log('A1 updated book:', updatedBook);
console.log('A1 original stock:', items.find(book => book.id === 3).stock);
console.log('A1 others:', others);

const limiter = createLimiter(3);
console.log('A2 uses:', [1, 2, 3, 4, 5].map(() => limiter.use()));
console.log('A2 remaining:', limiter.remaining());
limiter.reset();
console.log('A2 remaining after reset:', limiter.remaining());


await loadDashboard();
await loadDashboard(true);


const firstBook = items[0];
const printedBook = new Book(firstBook.id, firstBook.name, firstBook.price);
const ebook = new EBook(firstBook.id, firstBook.name, firstBook.price, 12);
console.log('A4 Book, 10% off:', printedBook.discountedPrice(10));
console.log('A4 EBook, 10% plus 5% off:', ebook.discountedPrice(10));
console.log('A4 method on instance:', Object.hasOwn(printedBook, 'discountedPrice'));
console.log('A4 method on prototype:', Object.hasOwn(Book.prototype, 'discountedPrice'));
