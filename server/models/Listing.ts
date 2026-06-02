import mongoose, { Schema, Types, Model } from 'mongoose';

export type Listing = {
  _id: Types.ObjectId;
  userId: string;
  title: string;
  desc: string;
  price: number;
  category: string;
  materialProperty: string;
  condition: string;
  createdAt: Date;
  updatedAt: Date;
  images: string[];
  status: string;
};

const listingSchema = new Schema<Listing>();

export const ListingDocument: Model<Listing> =
  mongoose.models.Listing || mongoose.model<Listing>('Listing', listingSchema);
