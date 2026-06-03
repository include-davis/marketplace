import styles from './page.module.scss';
import RightArrow from '@/../public/rightArrow.svg';
import Listings from '../_components/Listings/Listings';
import Image from 'next/image';
import MOCK_LISTINGS_COMPLETED from '@/mocks/mock_listings_completed.json';

export default function Completed() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <span>Sell</span>
        <Image src={RightArrow} alt=">" />
        <span>Drafts</span>
      </div>
      <Listings view="completed" listings={MOCK_LISTINGS_COMPLETED}/>
    </div>
  );
}
