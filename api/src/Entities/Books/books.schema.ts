import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

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

  @Prop({ required: true })
  publisher: string;
}

export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book);
