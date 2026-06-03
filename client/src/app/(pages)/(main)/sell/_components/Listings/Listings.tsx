'use client';
import { Listing } from '../../../../../../../../server/models/Listing';
import { FilterType } from '../../_utils/listings-utils';
import ListingsFilterBar from '../ListingsFilterBar/ListingsFilterBar';
import ListingsGrid from '../ListingsGrid/ListingsGrid';
import SellActions from '../SellActions/SellActions';
import styles from './Listings.module.scss';
import MOCK_LISTINGS from '@/mocks/mock_listings.json';

export default function Listings({
  listings,
  view,
}: {
  listings: Listing[];
  view: FilterType;
}) {

  return (
    <div className={styles.listings}>
      <SellActions view={view} />
      <div className={styles.listingsContent}>
        <ListingsFilterBar selected={view} />
        <ListingsGrid listings={listings} view={view} />
      </div>
    </div>
  );
}
