export type FilterState = {
  categories: Set<string>;
  priceRanges: Set<string>;
  sortBy: string | null;
};
