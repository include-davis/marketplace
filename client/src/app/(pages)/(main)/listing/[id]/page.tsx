'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import LeftArrow from '@/../public/leftArrow.svg';
import Link from 'next/link';
import { useState } from 'react';

const MOCK_IMG_SRCS = [
  '/mock/listings/view_mock1.jpg',
  '/mock/listings/view_mock2.jpg',
  '/mock/listings/view_mock3.jpg',
];

const MOCK_LISTING = {
  title: 'Various machine parts',
  desc: 'This bundle comes with various machine parts with several different applications. Includes rotators, chips, and satellite pieces applicable to machinery projects.',
  price: 299,
  category: 'Power Transmission',
  materialProperty: 'Mechanical Property',
  condition: 'Like new',
  dimensions: '2 x 2 x 2 (m)',
  createdAt: '2026-06-01T19:39:48.776Z',
  updatedAt: '2026-06-01T19:39:48.776Z',
  images: [
    '/mock/listings/view_mock1.jpg',
    '/mock/listings/view_mock2.jpg',
    '/mock/listings/view_mock3.jpg',
  ],
  status: 'active',
  conversationId: '6a1cb4142dde3ed69cbbe8ee',
};

export default function Listing() {
  const [imageIdx, setImageIdx] = useState(0);
  const listing = MOCK_LISTING;

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.pageHeader}>
        <Image src={LeftArrow} alt="<" />
        <span>Back</span>
      </Link>
      <div className={styles.pageContent}>
        <div className={styles.imageSection}>
          <div className={styles.imageWheel}>
            {MOCK_IMG_SRCS.map((src, idx) => (
              <button
                className={styles.wheelImageWrapper}
                onClick={() => setImageIdx(idx)}
                key={src}
              >
                <Image src={src} alt={src} height={144} width={144} />
              </button>
            ))}
          </div>
          <div className={styles.mainImageWrapperWrapper}>
            <div className={styles.mainImageWrapper}>
              <Image
                src={MOCK_IMG_SRCS[imageIdx]}
                alt={MOCK_IMG_SRCS[imageIdx]}
                fill
                className={styles.mainImage}
              />
            </div>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoBox}>
            <h3>{listing.title}</h3>
          </div>
          <div className={styles.infoBox}>
            <h3>Description</h3>
            <p>{listing.desc}</p>
          </div>
          <div className={styles.infoPair}>
            <div className={styles.infoBox}>
              <h3>{listing.category}</h3>
            </div>
            <div className={styles.infoBox}>
              <h3>Type of Metal</h3>
            </div>
          </div>
          <div className={styles.infoPair}>
            <div className={styles.infoBox}>
              <h3>{listing.materialProperty}</h3>
            </div>
            <div className={styles.infoBox}>
              <h3>{listing.condition}</h3>
            </div>
          </div>
          <div className={styles.infoPair}>
            <div className={`${styles.infoBox} ${styles.infoBoxShort}`}>
              <h3>{listing.dimensions}</h3>
            </div>
            <div className={`${styles.infoBox} ${styles.infoBoxShort}`}>
              <h3>${listing.price}</h3>
            </div>
          </div>
          <Link
            className={styles.messageButton}
            href={`/chat/${listing.conversationId}`}
          >
            Message Seller
          </Link>
        </div>
      </div>
    </div>
  );
}
