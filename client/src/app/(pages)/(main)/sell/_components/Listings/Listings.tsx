'use client';
import { FilterType } from '../../_utils/listings-utils';
import ListingsFilterBar from '../ListingsFilterBar/ListingsFilterBar';
import ListingsGrid from '../ListingsGrid/ListingsGrid';
import SellActions from '../SellActions/SellActions';
import styles from './Listings.module.scss';

export default function Listings({ view }: { view: FilterType }) {
  return (
    <div className={styles.listings}>
      <SellActions view={view} />
      <div className={styles.listingsContent}>
        <ListingsFilterBar selected={view} />
        <ListingsGrid />
      </div>
    </div>
  );
}
