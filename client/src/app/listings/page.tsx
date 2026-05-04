"use client";

import { useEffect, useMemo, useState } from "react";
import FilterSection from "@/components/listings/FilterSection";
import ProductGrid from "@/components/listings/ProductGrid";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/listings/ListingStates";

type ListingStatus = "active" | "inactive" | "draft" | "completed";

type Product = {
  _id: string;
  title: string;
  desc?: string;
  price: number;
  category?: string;
  stock?: number;
  imageUrl?: string;
  status?: ListingStatus;
};

const statusLabels: Record<ListingStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  draft: "Drafts",
  completed: "Completed",
};

export default function ListingsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ListingStatus>("active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchListings() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch("http://localhost:5001/listings");

        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to load listings");
        }

        const listingsWithDefaultStatus = result.data.map((listing: Product) => ({
          ...listing,
          status: listing.status || "active",
        }));

        setProducts(listingsWithDefaultStatus);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  const statusCounts = useMemo(() => {
    return {
      active: products.filter((product) => product.status === "active").length,
      inactive: products.filter((product) => product.status === "inactive").length,
      draft: products.filter((product) => product.status === "draft").length,
      completed: products.filter((product) => product.status === "completed").length,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.status === selectedStatus);
  }, [products, selectedStatus]);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        padding: "2rem 3rem",
      }}
    >
      <section style={{ marginBottom: "3rem" }}>
        <p
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#111",
            marginBottom: "2rem",
          }}
        >
          Sell &gt; {statusLabels[selectedStatus]} Listings
        </p>
      </section>

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