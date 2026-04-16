type Product = {
    _id?: string;
    title: string;
    desc?: string;
    price: number;
    category: string;
    stock?: number;
    image?: string;
  };
  
  type ProductCardProps = {
    product: Product;
  };
  
  export default function ProductCard({ product }: ProductCardProps) {
    const description = product.desc ?? "No description available";
    const stockDisplay = product.stock ?? "N/A";
    const hasImage = Boolean(product.image);
  
    return (
      <div
        style={{
          border: "1px solid #333",
          borderRadius: "10px",
          padding: "1rem",
          backgroundColor: "#111",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {hasImage ? (
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
        ) : (
          <div
            style={{
              height: "150px",
              backgroundColor: "#222",
              borderRadius: "8px",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#888",
              fontSize: "0.95rem",
            }}
          >
            No Image
          </div>
        )}
  
        <div>
          <h3 style={{ marginBottom: "0.5rem" }}>{product.title}</h3>
          <p style={{ marginBottom: "0.25rem", fontWeight: "bold" }}>
            ${product.price}
          </p>
          <p style={{ color: "#aaa", marginBottom: "0.25rem" }}>
            {product.category}
          </p>
          <p style={{ color: "#aaa", marginBottom: "0.5rem" }}>
            Stock: {stockDisplay}
          </p>
          <p style={{ color: "#bbb", fontSize: "0.9rem" }}>
            {description.length > 60
              ? description.slice(0, 60) + "..."
              : description}
          </p>
        </div>
      </div>
    );
  }