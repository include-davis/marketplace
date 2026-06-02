import Image from 'next/image';
import styles from './page.module.scss';
import RightArrow from '@/../public/rightArrow.svg';
import Listings from '../_components/Listings/Listings';

export default function Inactive() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <span>Sell</span>
        <Image src={RightArrow} alt=">" />
        <span>Inactive Listings</span>
      </div>
      <Listings view="inactive" />
    </div>
  );
}
