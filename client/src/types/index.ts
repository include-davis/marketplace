export type Listing = {
  _id: string;
  title: string;
  desc: string;
  price: number;
  category: string;
  stock: number;
  createdAt: string;
};

export type FilterState = {
  categories: Set<string>;
  priceRanges: Set<string>;
  sortBy: string | null;
};
