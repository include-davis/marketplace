// client/src/utils/listings-utils.ts

export type ListingStatus = 'active' | 'inactive' | 'draft' | 'completed';

export type Product = {
  _id: string;
  title: string;
  price: number;
  desc?: string;
  category?: string;
  stock?: number;
  images?: string[];
  status?: ListingStatus;
};
