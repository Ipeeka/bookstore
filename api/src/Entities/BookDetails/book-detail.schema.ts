import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class bookDetails extends Document {
  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  Comments: string;

  @Prop()
  UserName: string;

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  likes: string;

  @Prop()
  disLikes: string;
}

export type BookDetailsDocument = bookDetails & Document;

export const BookDetailsSchema = SchemaFactory.createForClass(bookDetails);
