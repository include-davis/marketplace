"use client";

import ProductGrid from "./_components/ProductGrid/ProductGrid";
import { mockListings } from "@/mock/listings";
import styles from "./page.module.scss";

export default function ListingsPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Listings</h1>
      <ProductGrid products={mockListings} selectedStatus="active" />
    </main>
  );
}