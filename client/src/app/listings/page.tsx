"use client";

import { useEffect, useMemo, useState } from "react";
import FilterSection from "@/components/listings/FilterSection";
import ProductGrid from "@/components/listings/ProductGrid";
import SortDropdown from "@/components/listings/SortDropdown";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/listings/ListingStates";

type Product = {
  _id: string;
  title: string;
  desc: string;
  price: number;
  category: string;
  stock: number;
};

export default function ListingsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [visibleCount, setVisibleCount] = useState(4);
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

        setProducts(result.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "title-az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, selectedCategory, sortOption]);

  const visibleProducts = filteredAndSortedProducts.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredAndSortedProducts.length;

  return (
    <main style={{ padding: "2rem" }}>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1>Listings</h1>

        <SortDropdown
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        <FilterSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState />
          ) : filteredAndSortedProducts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <ProductGrid products={visibleProducts} />

              {canLoadMore && (
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 4)}
                    style={{
                      padding: "0.75rem 1.25rem",
                      borderRadius: "8px",
                      border: "1px solid #333",
                      backgroundColor: "#111",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}