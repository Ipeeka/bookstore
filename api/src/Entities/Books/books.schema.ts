import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 'https://plus.unsplash.com/premium_vector-1724428138403-8a4ad0f9b344?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }) // Default image URL
  img: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publicationYear: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: Date.now })
  dateAdded: Date;

  @Prop({
    type: String,
    enum: ['inStock', 'lowStock', 'preOrder', 'outOfStock'],
    default: 'inStock',
  })
  inventoryStatus: string;

  @Prop({ default: false })
  bookmarked: boolean;

  @Prop({ default: false })
  cartAdded: boolean;

  @Prop({ required: true })
  publisher: string;


}

export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book);
