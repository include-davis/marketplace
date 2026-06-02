import mongoose, { Schema, Types, Model } from 'mongoose';

export type Conversation = {
  _id: Types.ObjectId;
  listingId: Types.ObjectId;
  user1id: string;
  user2id: string;
  createdAt: Date;
  updatedAt: Date;
};

const conversationSchema = new Schema<Conversation>();

export const ConversationDocument: Model<Conversation> =
  mongoose.models.Conversation ||
  mongoose.model<Conversation>('Conversation', conversationSchema);
