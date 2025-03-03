import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publicationYear: number;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: true })
  availability: boolean;

  @Prop({ default: false })  
  bookmarked: boolean; 


}



export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book);
