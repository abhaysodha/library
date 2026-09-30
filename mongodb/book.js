import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  category: { type: String, enum: ['Tech', 'Self-help', 'History'] },
  price: { type: Number, min: 0 },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

bookSchema.index({ category: 1, price: -1 });

export const Book = mongoose.model('Book', bookSchema);
