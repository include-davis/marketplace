import Image from 'next/image';
import styles from './page.module.scss';
import LeftArrow from '@/../public/leftArrow.svg';
import Link from 'next/link';

const MOCK_IMG_SRCS = [
  '/mock/listings/listings_mock1.jpg',
  '/mock/listings/listings_mock2.jpg',
  '/mock/listings/listings_mock3.jpg',
];

export default function Listing() {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.pageHeader}>
        <Image src={LeftArrow} alt="<" />
        <span>Back</span>
      </Link>
      <div className={styles.pageContent}>
        <div className={styles.imageSection}>
          <div className={styles.imageWheel}>
            {MOCK_IMG_SRCS.map((src) => (
              <div className={styles.wheelImageWrapper}>
                <Image src={src} alt={src} key={src} height={144} width={144} />
              </div>
            ))}
          </div>
          <div className={styles.mainImageWrapperWrapper}>
            <div className={styles.mainImageWrapper}>
              <Image
                src={MOCK_IMG_SRCS[1]}
                alt={MOCK_IMG_SRCS[1]}
                fill
                className={styles.mainImage}
              />
            </div>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoBox}>
            <h3>Product Name</h3>
          </div>
          <div className={styles.infoBox}>
            <h3>Description</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Consectetur mi tempus
              blandit quisque volutpat et. Ac sapien nulla sit vitae neque
              mattis dictum nisi duis. Egestas amet vitae nam turpis turpis
              auctor. Faucibus fusce vulputate faucibus porttitor nulla.
            </p>
          </div>
          <div className={styles.infoPair}>
            <div className={styles.infoBox}>
              <h3>Category</h3>
            </div>
            <div className={styles.infoBox}>
              <h3>Type of Metal</h3>
            </div>
          </div>
          <div className={styles.infoPair}>
            <div className={styles.infoBox}>
              <h3>Metal Property</h3>
            </div>
            <div className={styles.infoBox}>
              <h3>Condition</h3>
            </div>
          </div>
          <div className={styles.infoPair}>
            <div className={`${styles.infoBox} ${styles.infoBoxShort}`}>
              <h3>Dimensions</h3>
            </div>
            <div className={`${styles.infoBox} ${styles.infoBoxShort}`}>
              <h3>$X</h3>
            </div>
          </div>
          <button className={styles.messageButton}>Message Seller</button>
        </div>
      </div>
    </div>
  );
}
