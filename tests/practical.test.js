import test from 'node:test';
import assert from 'node:assert/strict';
import { items } from '../data.js';
import { availableNames, totalStockValue, updatedBook, others, createLimiter, Book, EBook, loadDashboard } from '../exercises.js';
import { createApp } from '../express-app/app.js';

test('A1 produces expected answers without mutating the dataset', () => {
  assert.deepEqual(availableNames, ['Clean Code', 'Sapiens', 'Deep Work', "You Don't Know JS"]);
  assert.equal(totalStockValue, 8840);
  assert.equal(updatedBook.stock, 9);
  assert.equal(items[2].stock, 8);
  assert.notEqual(updatedBook, items[2]);
  assert.deepEqual(others, { id: 1, category: 'Tech', stock: 5 });
});
test('A2 caps uses, resets, and isolates counters', () => {
  const limiter = createLimiter(3);
  assert.deepEqual([1, 2, 3, 4, 5].map(() => limiter.use()), [true, true, true, false, false]);
  assert.equal(limiter.remaining(), 0);
  assert.equal(createLimiter(3).remaining(), 3);
  limiter.reset();
  assert.equal(limiter.remaining(), 3);
  assert.equal(limiter.use(), true);
  assert.equal(createLimiter(0).use(), false);
});
test('A3 reports success and handles failure', async t => {
  const log = t.mock.method(console, 'log', () => {});
  await loadDashboard();
  await loadDashboard(true);
  assert.deepEqual(log.mock.calls.map(call => call.arguments[0]), ['5 books across 3 categories', 'Failed: API request failed']);
});
test('A4 uses inherited discounts and prototype methods', () => {
  const book = new Book(1, 'Clean Code', 450);
  const ebook = new EBook(1, 'Clean Code', 450, 12);
  assert.equal(book.discountedPrice(10), 405);
  assert.equal(ebook.discountedPrice(10), 384.75);
  assert.equal(ebook instanceof Book, true);
  assert.equal(Object.hasOwn(ebook, 'discountedPrice'), false);
});
test('A5 API filters, validates, generates IDs, handles malformed JSON, and logs requests', async t => {
  const logs = [];
  const server = createApp(message => logs.push(message)).listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  assert.equal((await (await fetch(`${base}/books`)).json()).length, 5);
  assert.deepEqual((await (await fetch(`${base}/books?category=Tech`)).json()).map(book => book.id), [1, 5]);
  assert.deepEqual(await (await fetch(`${base}/books/3`)).json(), items[2]);
  const missing = await fetch(`${base}/books/99`);
  assert.equal(missing.status, 404);
  assert.deepEqual(await missing.json(), { error: 'Book not found' });
  const post = body => fetch(`${base}/books`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const valid = { name: 'New book', category: 'Tech', stock: 0, price: 2000 };
  for (const change of [{ name: 'A' }, { category: 3 }, { stock: -1 }, { stock: 1.5 }, { price: 0 }, { price: 2001 }, { price: '450' }]) {
    const response = await post({ ...valid, ...change });
    assert.equal(response.status, 400);
    assert.ok((await response.json()).errors.length > 0);
  }
  const created = await post({ ...valid, id: 99 });
  assert.equal(created.status, 201);
  assert.deepEqual(await created.json(), { ...valid, id: 6 });
  assert.equal((await (await post(valid)).json()).id, 7);
  const malformed = await fetch(`${base}/books`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' });
  assert.equal(malformed.status, 400);
  assert.equal(logs.length, 14);
  assert.ok(logs.every(line => /^(GET|POST) \/books.* - \d+ms$/.test(line)));
});
