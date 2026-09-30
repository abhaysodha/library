export interface Book {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export enum BookStatus {
  Available,
  Issued,
  Reserved
}

export function findById<T extends { id: number }>(list: T[], id: number): T | undefined {
  return list.find(item => item.id === id);
}

// Unlike any[], this keeps the item's type and requires a numeric id.
