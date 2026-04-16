import ProductCard from "./ProductCard";

type Product = {
  _id?: string;
  title: string;
  desc?: string;
  price: number;
  category: string;
  stock?: number;
  image?: string;
};

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <p style={{ color: "#aaa" }}>No products available.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {products.map((product, index) => {
        const key = product._id?.toString() || `${product.title}-${index}`;

        return <ProductCard key={key} product={product} />;
      })}
    </div>
  );
}