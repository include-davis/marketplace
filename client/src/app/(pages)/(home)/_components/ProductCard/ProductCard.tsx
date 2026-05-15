import React from 'react';
import styles from './ProductCard.module.scss';

interface Listing {
  _id: string;
  title: string;
  desc: string;
  price: number;
  category: string;
  stock: number;
}

export default function ProductCard({ listing }: { listing: Listing }) {
  return (
    <div className={styles.card}>
      <div className={styles.image} />

      <div className={styles.info}>
        <h2 className={styles.title}>{listing.title}</h2>
        <h2 className={styles.price}>${listing.price}</h2>
      </div>
    </div>
  );
}
