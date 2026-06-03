import Image from 'next/image';
import styles from './page.module.scss';
import RightArrow from '@/../public/rightArrow.svg';
import Listings from '../_components/Listings/Listings';
import MOCK_LISTINGS_ACTIVE from '@/mocks/mock_listings_active.json';

export default function Active() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <span>Sell</span>
        <Image src={RightArrow} alt=">" />
        <span>Active Listings</span>
      </div>
      <Listings view="active" listings={MOCK_LISTINGS_ACTIVE} />
    </div>
  );
}
