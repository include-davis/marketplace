import mongoose, { Schema, Types, Model } from 'mongoose';

export type Message = {
  _id?: Types.ObjectId;
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId;
  message: string;
  image?: string | null;
  createdAt: Date;
};

const messageSchema = new Schema<Message>();

export const MessageDocument: Model<Message> =
  mongoose.models.Message || mongoose.model<Message>('Message', messageSchema);
