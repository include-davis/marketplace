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

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // The number of pages for the Pagination is the number of listings divided
  // by 9, rounded up
  const totalPages = Math.max(1, Math.ceil(listings.length / 9));

  // Figure out which listings to display based on the current page number
  const currentListings = listings.slice((currentPage - 1) * 9, (currentPage - 1) * 9 + 9);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.searchHeading}>
        Search Results for &ldquo;X&rdquo;
      </h1>

      <div className={styles.contentRow}>
        <HomepageFilterMenu />

        <div className={styles.listingsArea}>
          <ProductGrid 
            listings={currentListings}
            loading={loading}
            error={error}
          />

          <HomePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
