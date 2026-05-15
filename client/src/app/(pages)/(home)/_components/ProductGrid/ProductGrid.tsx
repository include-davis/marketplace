'use client';

import React, { useEffect, useState } from 'react';
import styles from './ProductGrid.module.scss';
import ProductCard from '../ProductCard/ProductCard';

interface Listing {
  _id: string;
  title: string;
  desc: string;
  price: number;
  category: string;
  stock: number;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProductGrid() {
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

  if (loading) {
    return <div className={styles.message}>Loading listings...</div>;
  }

  if (error) {
    return <div className={styles.message}>Error -- {error}</div>;
  }

  if (listings.length === 0) {
    return <div className={styles.message}>No listings found.</div>;
  }

  return (
    <div className={styles.grid}>
      {listings.map((listing) => (
        <ProductCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
}
