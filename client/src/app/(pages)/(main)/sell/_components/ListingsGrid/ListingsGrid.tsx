'use client';

import { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import styles from './ListingsGrid.module.scss';
import { Listing } from '@/../../server/models/Listing';
import CameraOff from '@/../public/listings/camera_off.svg';
import Trash from '@/../public/listings/trash.svg';
import DownArrow from '@/../public/listings/down_arrow.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function ListingsGrid({ listings }: { listings: Listing[] }) {
  return (
    <div className={styles.listingsGrid}>
      <div className={styles.gridHeader}>
        <div className={styles.infoHeaders}>
          <div className={styles.listingTitleHeader}>
            <h4>Item Title</h4>
          </div>
          <h4>Price</h4>
        </div>
        <h4>--</h4>
      </div>
      {listings.map((listing) => (
        <SellerListing listing={listing as Listing} />
      ))}
    </div>
  );
}

function SellerListing({ listing }: { listing: Listing }) {
  const [isSelected, setIsSelected] = useState(false);
  const hasImage = listing.images.length !== 0;
  return (
    <div className={styles.sellerListing}>
      <div className={styles.listingInfo}>
        <Checkbox isChecked={isSelected} setIsChecked={setIsSelected} />
        <Link
          className={styles.imageContainer}
          href={`listings/${listing._id}`}
        >
          {hasImage ? (
            <Image
              src={listing.images[0]}
              alt={listing.title}
              width={128}
              height={128}
            />
          ) : (
            <Image src={CameraOff} alt="Camera off" />
          )}
        </Link>
        <Link className={styles.listingTitle} href={`listings/${listing._id}`}>
          <h4>{listing.title}</h4>
        </Link>
        <div className={styles.inputWrapper}>
          <span className={styles.inputMoneySign}>$</span>
          <input className={styles.priceInput} type="number" step="0.01" />
        </div>
      </div>
      <div className={styles.listingActions}>
        <button className={styles.actionButton}>
          <Image src={Trash} alt="Trash" />
        </button>
        <button className={styles.actionButton}>
          <Image src={DownArrow} alt="Down arrow" />
        </button>
      </div>
    </div>
  );
}
