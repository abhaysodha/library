import { Book } from './book.js';

export async function getTopCategories() {
  return Book.aggregate([
    {
      $group: {
        _id: '$category',
        totalStockValue: { $sum: { $multiply: ['$price', '$stock'] } }
      }
    },
    { $sort: { totalStockValue: -1 } },
    { $limit: 2 }
  ]);
}

export async function getAvailableBooks() {
  return Book.find({ stock: { $gt: 0 }, price: { $gte: 400 } })
    .sort({ price: -1 })
    .limit(3);
}
