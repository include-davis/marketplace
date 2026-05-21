'use client';

import styles from './page.module.scss';
import { useState, useEffect } from 'react';
import HomePagination from './_components/HomePagination/HomePagination';
import HomepageFilterMenu from './_components/HomepageFilterMenu/HomepageFilterMenu';
import ProductGrid from './_components/ProductGrid/ProductGrid';

interface Listing {
  _id: string;
  title: string;
  desc: string;
  price: number;
  category: string;
  stock: number;
}

interface FilterState {
  categories: Set<string>;
  priceRanges: Set<string>;
  sortBy: string | null;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const PRICE_RANGE_MAP: Record<string, [number, number]> = {
  'Under $250': [0, 250],
  '$250 - $500': [250, 500],
  '$500 - $750': [500, 750],
  '$750 - $1000': [750, 1000],
  '$1000+': [1000, Infinity],
};

const DEFAULT_FILTERS: FilterState = {
  categories: new Set(),
  priceRanges: new Set(),
  sortBy: null,
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingFilters, setPendingFilters] =
    useState<FilterState>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterState>(DEFAULT_FILTERS);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/listings`);

        if (!response.ok) {
          throw new Error(`Failed to fetch listings: ${response.status}`);
        }

        const json = await response.json();
        setListings(json.data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Handler for keeping track of the checked options in the
  // "Category" dropdown
  const handleCategory = (option: string) => {
    setPendingFilters((prev) => {
      const next = new Set(prev.categories);
      next.has(option) ? next.delete(option) : next.add(option);
      return { ...prev, categories: next };
    });
  };

  // Handler for keeping track of the checked options in the
  // "Price Range" dropdown
  const handlePriceRange = (option: string) => {
    setPendingFilters((prev) => {
      const next = new Set(prev.priceRanges);
      next.has(option) ? next.delete(option) : next.add(option);
      return { ...prev, priceRanges: next };
    });
  };

  // Unlike the other 2 handlers, the "Sort By" filter dropdown is
  // single-select (only 1 option should be checked at any time)
  const handleSortBy = (option: string) => {
    setPendingFilters((prev) => ({
      ...prev,
      sortBy: prev.sortBy === option ? null : option,
    }));
  };

  // Handler for when the "Apply" button in the FilterMenu is pressed
  const handleApply = () => {
    setAppliedFilters(pendingFilters);
    setCurrentPage(1);
  };

  // Put each listing through the filters and sort them if necessary
  const filteredListings = listings
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
    });

  // The number of pages for the Pagination is the number of listings divided
  // by 9, rounded up
  const totalPages = Math.max(1, Math.ceil(filteredListings.length / 9));

  // Figure out which listings to display based on the current page number
  const currentListings = filteredListings.slice(
    (currentPage - 1) * 9,
    (currentPage - 1) * 9 + 9
  );

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.searchHeading}>
        Search Results for &ldquo;X&rdquo;
      </h1>

      <div className={styles.contentRow}>
        <HomepageFilterMenu
          filters={pendingFilters}
          handleCategory={handleCategory}
          handlePriceRange={handlePriceRange}
          handleSortBy={handleSortBy}
          handleApply={handleApply}
        />

        <div className={styles.listingsArea}>
          <ProductGrid
            listings={currentListings}
            loading={loading}
            error={error}
          />

          <div className={styles.paginationWrapper}>
            <HomePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
