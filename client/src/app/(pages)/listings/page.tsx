"use client";

import ProductGrid from "../../components/listings/ProductGrid/ProductGrid";
import { mockListings } from "../../mock/listings";

export default function ListingsPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Listings</h1>

      <ProductGrid products={mockListings} selectedStatus="active" />
    </main>
  );
}