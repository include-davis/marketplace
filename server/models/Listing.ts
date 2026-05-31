import mongoose, { Schema, Types, Model } from 'mongoose';

export type Listing = {
  _id: Types.ObjectId;
  userId: string;
  title: string;
  desc: string;
  price: number;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
};

const listingSchema = new Schema<Listing>();

export const ListingDocument: Model<Listing> =
  mongoose.models.Listing || mongoose.model<Listing>('Listing', listingSchema);
