type ListingStatus = "active" | "inactive" | "draft" | "completed";

type Product = {
  _id?: string;
  title: string;
  price: number;
  image?: string;
  imageUrl?: string;
  status?: ListingStatus;
};

type ProductCardProps = {
  product: Product;
  selectedStatus: ListingStatus;
};

export default function ProductCard({
  product,
  selectedStatus,
}: ProductCardProps) {
  const imageSrc = product.image || product.imageUrl;

  const statusLabel =
    selectedStatus === "inactive"
      ? "INACTIVE"
      : selectedStatus === "draft"
      ? "DRAFT"
      : selectedStatus === "completed"
      ? "SOLD"
      : null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40px 80px 1fr 120px 40px 40px",
        alignItems: "center",
        gap: "1rem",
        padding: "1.25rem 0",
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
    >
      {/* Checkbox */}
      <input type="checkbox" />

      {/* Image */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#e5e5e5",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          color: "#777",
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          "No Image"
        )}

        {/* Status overlay */}
        {statusLabel && (
          <div
            style={{
              position: "absolute",
              bottom: "4px",
              left: "4px",
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "#fff",
              fontSize: "0.65rem",
              padding: "2px 6px",
              borderRadius: "4px",
              fontWeight: 600,
            }}
          >
            {statusLabel}
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <p
          style={{
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#111",
          }}
        >
          {product.title}
        </p>
      </div>

      {/* Price input */}
      <input
        type="number"
        defaultValue={product.price}
        style={{
          padding: "0.4rem 0.5rem",
          border: "1px solid #ddd",
          borderRadius: "6px",
          width: "100%",
          fontSize: "0.9rem",
        }}
      />

      {/* Delete icon */}
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          color: "#666",
        }}
      >
        🗑
      </button>

      {/* Dropdown icon */}
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          color: "#666",
        }}
      >
        ▾
      </button>
    </div>
  );
}