import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.scss';
import { Product, ListingStatus } from '@/utils/listings-utils';

export default function ProductGrid({
  products,
  selectedStatus,
}: {
  products: Product[];
  selectedStatus: ListingStatus;
}) {
  if (!products || products.length === 0) {
    return <p className={styles.emptyState}>No listings available.</p>;
  }

  const actionLabel =
    selectedStatus === 'active'
      ? 'Mark Inactive'
      : selectedStatus === 'inactive'
        ? 'Mark Active'
        : '';

  return (
    <section>
      <div className={styles.toolbar}>
        <label className={styles.selectAllLabel}>
          <input type="checkbox" />
          Select all
        </label>

        <div className={styles.actions}>
          {selectedStatus === 'active' && (
            <button className={styles.secondaryButton} type="button">
              List an Item
            </button>
          )}

          {actionLabel && (
            <button className={styles.secondaryButton} type="button">
              {actionLabel}
            </button>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product._id || product.title}
            product={product}
            selectedStatus={selectedStatus}
          />
        ))}
      </div>
    </section>
  );
}
