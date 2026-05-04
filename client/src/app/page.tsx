"use client";

import { useMemo, useState } from "react";
import FilterSection from "@/components/listings/FilterSection";
import ProductGrid from "@/components/listings/ProductGrid";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/listings/ListingStates";

type ListingStatus = "active" | "inactive" | "draft" | "completed";

type Product = {
  id: number;
  title: string;
  price: number;
  category?: string;
  status: ListingStatus;
  image?: string;
  imageUrl?: string;
};

const mockProducts: Product[] = [
  { id: 1, title: "Wireless Mouse", price: 25, category: "Electronics", status: "active" },
  { id: 2, title: "Desk Lamp", price: 40, category: "Home", status: "active" },
  { id: 3, title: "T-Shirt", price: 18, category: "Clothing", status: "inactive" },
  { id: 4, title: "Notebook", price: 8, category: "Books", status: "draft" },
  { id: 5, title: "Keyboard", price: 55, category: "Electronics", status: "completed" },
  { id: 6, title: "Hoodie", price: 35, category: "Clothing", status: "active" },
  { id: 7, title: "Shelf Organizer", price: 30, category: "Home", status: "inactive" },
  { id: 8, title: "Novel", price: 14, category: "Books", status: "completed" },
];

const statusLabels: Record<ListingStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  draft: "Drafts",
  completed: "Completed",
};

export default function ListingsPage() {
  const [selectedStatus, setSelectedStatus] = useState<ListingStatus>("active");

  const loading = false;
  const error = false;

  const statusCounts = useMemo(() => {
    return {
      active: mockProducts.filter((product) => product.status === "active").length,
      inactive: mockProducts.filter((product) => product.status === "inactive").length,
      draft: mockProducts.filter((product) => product.status === "draft").length,
      completed: mockProducts.filter((product) => product.status === "completed").length,
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => product.status === selectedStatus);
  }, [selectedStatus]);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        padding: "2rem 3rem",
      }}
    >
      <p
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "#111",
          marginBottom: "3rem",
        }}
      >
        Sell &gt; {statusLabels[selectedStatus]} Listings
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        <FilterSection
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          statusCounts={statusCounts}
        />

        <div>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState />
          ) : filteredProducts.length === 0 ? (
            <EmptyState />
          ) : (
            <ProductGrid
              products={filteredProducts}
              selectedStatus={selectedStatus}
            />
          )}
        </div>
      </section>
    </main>
  );
}