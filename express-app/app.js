import express from 'express';
import { z } from 'zod';
import { items } from '../data.js';

const bookSchema = z.object({
  name: z.string().trim().min(2),
  category: z.string(),
  stock: z.number().int().min(0),
  price: z.number().positive().max(2000),
});

export function createApp(logger = console.log) {
  const app = express();
  const books = items.map(book => ({ ...book }));
  let nextId = Math.max(0, ...books.map(book => book.id)) + 1;

  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const time = Date.now() - start;
      logger(`${req.method} ${req.originalUrl} - ${time}ms`);
    });
    next();
  });
  app.use(express.json());

  app.get('/books', (req, res) => {
    const category = req.query.category;
    if (category !== undefined) {
      const filteredBooks = books.filter(book => book.category === category);
      return res.json(filteredBooks);
    }
    res.json(books);
  });

  app.get('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(book => book.id === id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  });

  app.post('/books', (req, res) => {
    const parsed = bookSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(issue => {
        const field = issue.path.join('.') || 'body';
        return `${field}: ${issue.message}`;
      });
      return res.status(400).json({ errors });
    }
    const book = { ...parsed.data, id: nextId };
    nextId += 1;
    books.push(book);
    res.status(201).json(book);
  });

  app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
    if (error.type === 'entity.too.large') {
      return res.status(413).json({ error: 'Request body too large' });
    }
    res.status(500).json({ error: 'Internal server error' });
  });
  return app;
}
