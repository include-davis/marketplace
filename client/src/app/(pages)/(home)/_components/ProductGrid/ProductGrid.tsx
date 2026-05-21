import styles from './ProductGrid.module.scss';
import ProductCard from '../ProductCard/ProductCard';

interface Listing {
  _id: string;
  title: string;
  desc: string;
  price: number;
  category: string;
  stock: number;
}

export default function ProductGrid({
  listings,
  loading,
  error,
}: {
  listings: Listing[];
  loading: boolean;
  error: string | null;
}) {
  if (loading) {
    return <div className={styles.message}>Loading listings...</div>;
  }

  if (error) {
    return <div className={styles.message}>ERROR -- {error}</div>;
  }

  if (listings.length === 0) {
    return <div className={styles.message}>No listings found.</div>;
  }

  return (
    <div className={styles.grid}>
      {listings.map((listing) => (
        <ProductCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
}
