
import { Document } from 'mongoose';

export interface Book extends Document {
  title: string;
  author: string;
  publicationYear: number;
  price: number;
  availability: boolean;
  genre: string;
  bookmarked: boolean;
}