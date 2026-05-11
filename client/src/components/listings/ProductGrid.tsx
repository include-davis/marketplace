import ProductCard from "./ProductCard";

type ListingStatus = "active" | "inactive" | "draft" | "completed";

type Product = {
  _id?: string;
  title: string;
  desc?: string;
  price: number;
  category?: string;
  stock?: number;
  image?: string;
  imageUrl?: string;
  status?: ListingStatus;
};

type ProductGridProps = {
  products: Product[];
  selectedStatus: ListingStatus;
};

export default function ProductGrid({
  products,
  selectedStatus,
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return <p style={{ color: "#555" }}>No listings available.</p>;
  }

  const actionLabel =
    selectedStatus === "active"
      ? "Mark Inactive"
      : selectedStatus === "inactive"
      ? "Mark Active"
      : "";

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          <input type="checkbox" />
          Select all
        </label>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          {selectedStatus === "active" && (
            <button
              style={{
                padding: "0.6rem 1rem",
                borderRadius: "6px",
                border: "1px solid #111",
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              List an Item
            </button>
          )}

          {actionLabel && (
            <button
              style={{
                padding: "0.6rem 1rem",
                borderRadius: "6px",
                border: "1px solid #111",
                backgroundColor: "#111",
                color: "white",
                cursor: "pointer",
              }}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #ddd",
        }}
      >
        {products.map((product, index) => {
          const key = product._id?.toString() || `${product.title}-${index}`;

          return (
            <ProductCard
              key={key}
              product={product}
              selectedStatus={selectedStatus}
            />
          );
        })}
      </div>
    </section>
  );
}