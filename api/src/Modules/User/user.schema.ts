import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({
    required: true,
  })
  userName: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    required: true,
    default: 'user',
  })
  role: string;

  @Prop({
    required: false,
  })
  phone: number;

  @Prop({
    required: false,
  })
  zipCode: string;

  @Prop({
    required: false,
  })
  state: string;

  @Prop({
    required: false,
  })
  city: string;

  @Prop({
    required: false,
  })
  street: string;

  @Prop({})
  profileImage?: string;

  @Prop({ required: true, default: false })
  isEmailVerified: boolean;

  @Prop({ required: false })
  otp?: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
