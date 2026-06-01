'use client';

import styles from './page.module.scss';
import { useState, useEffect } from 'react';
import HomePagination from '../_components/HomePagination/HomePagination';
import HomepageFilterMenu from '../_components/HomepageFilterMenu/HomepageFilterMenu';
import ProductGrid from '../_components/ProductGrid/ProductGrid';
import { Listing, FilterState } from '@/types';
import { getFilteredListings } from '@/utils/listingUtils';
import useFetch from '@/app/_hooks/useFetch';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const DEFAULT_FILTERS: FilterState = {
  categories: new Set(),
  priceRanges: new Set(),
  sortBy: null,
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingFilters, setPendingFilters] =
    useState<FilterState>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterState>(DEFAULT_FILTERS);

  const { result: listings, loading, error } = useFetch<Listing[]>('/listings');

  if (loading) return <div>Loading listings...</div>;
  if (error) return <div>Error fetching listings.</div>;

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

  const filteredListings = getFilteredListings(listings || [], appliedFilters);

  // The number of pages for the Pagination is the number of listings divided
  // by 9, rounded up
  const totalPages = Math.max(1, Math.ceil(filteredListings.length / 9));

  // Figure out which listings to display based on the current page number
  const currentListings = filteredListings.slice(
    (currentPage - 1) * 9,
    (currentPage - 1) * 9 + 9,
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
