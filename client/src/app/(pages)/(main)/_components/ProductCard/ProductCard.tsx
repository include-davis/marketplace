import Image from 'next/image';
import styles from './ProductCard.module.scss';
import { Listing } from '@/../../server/models/Listing';

export default function ProductCard({ listing }: { listing: Listing }) {
  const hasImage = listing.images.length !== 0;

  return (
    <div className={styles.card}>
      {hasImage ? (
        <Image
          src={listing.images[0]}
          width={300}
          height={300}
          className={styles.image}
          alt={listing.title}
        />
      ) : (
        <div className={styles.image} />
      )}

      <div className={styles.info}>
        <h2 className={styles.title}>{listing.title}</h2>
        <h2 className={styles.price}>${listing.price}</h2>
      </div>
    </div>
  );
}
