import type { Book } from './b2.js';

export type UpdateBookDto = Partial<Pick<Book, 'price' | 'stock'>>;

export type BookPreview = Omit<Book, 'stock'>;

export interface BookCardProps {
  item: Book;
  onSelect: (id: number) => void;
}
