import { Document } from 'mongoose';

export interface Book extends Document {
  title: string;
  author: string;
  publicationYear: string;
  price: number;
  genre: string;
  bookmarked: boolean;
  quantity: number;
  description: string;
  inventoryStatus: 'inStock' | 'lowStock' | 'preOrder' | 'outOfStock';
  publisher: string;
}
