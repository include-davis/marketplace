
import Image from 'next/image';
import styles from './ProductCard.module.scss';
// Import the types from the new shared file
import { Product, ListingStatus } from "@/utils/listings-utils";

export default function ProductCard({
  product,
  selectedStatus,
}: {
  product: Product;
  selectedStatus: ListingStatus;
}) {
  const imageSrc = product.images?.[0] || '/fallback-placeholder.png';

  const statusLabel =
    selectedStatus === 'inactive'
      ? 'INACTIVE'
      : selectedStatus === 'draft'
      ? 'DRAFT'
      : selectedStatus === 'completed'
      ? 'SOLD'
      : null;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={product.title}
          width={180}
          height={140}
          className={styles.productImage}
        />
        {statusLabel && <div className={styles.statusBadge}>{statusLabel}</div>}
      </div>

      <div className={styles.content}>
        <p className={styles.title}>{product.title}</p>
        <input
          className={styles.priceInput}
          type="number"
          defaultValue={product.price}
        />
        <div className={styles.actions}>
          <button className={styles.iconButton} type="button">
            🗑
          </button>
          <button className={styles.iconButton} type="button">
            ⌄
          </button>
        </div>
      </div>
    </div>
  );
}
