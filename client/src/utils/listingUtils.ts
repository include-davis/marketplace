import { Listing, FilterState } from '@/types';

const PRICE_RANGE_MAP: Record<string, [number, number]> = {
  'Under $250': [0, 250],
  '$250 - $500': [250, 500],
  '$500 - $750': [500, 750],
  '$750 - $1000': [750, 1000],
  '$1000+': [1000, Infinity],
};

export function getFilteredListings(
  listings: Listing[],
  appliedFilters: FilterState
): Listing[] {
  return (
    listings
      // First filter the listings based on which filter options are checked
      .filter((listing) => {
        // Category filter
        if (appliedFilters.categories.size > 0) {
          if (!appliedFilters.categories.has(listing.category)) {
            return false;
          }
        }

        // Price range filter
        if (appliedFilters.priceRanges.size > 0) {
          // The current listing won't be filtered if it falls into ANY
          // of the selected price ranges
          const inRange = [...appliedFilters.priceRanges].some((range) => {
            const [min, max] = PRICE_RANGE_MAP[range];
            return listing.price >= min && listing.price < max;
          });

          if (!inRange) {
            return false;
          }
        }

        return true;
      })
      // Then sort the filtered listings based on the "Sort By" dropdown
      .sort((a, b) => {
        if (appliedFilters.sortBy === 'Price: Low to High') {
          return a.price - b.price;
        }

        if (appliedFilters.sortBy === 'Price: High to Low') {
          return b.price - a.price;
        }

        return 0;
      })
  );
}
