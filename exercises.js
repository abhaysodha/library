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
