import { Schema, Document } from 'mongoose';

export interface Notification extends Document {
  type: string;
  data: any;
  date: Date;
  read: boolean;
}

export const NotificationSchema = new Schema<Notification>({
  type: { type: String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});
