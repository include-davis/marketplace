import Image from 'next/image';
import styles from './page.module.scss';
import RightArrow from '@/../public/rightArrow.svg';
import Listings from '../_components/Listings/Listings';

export default function Active() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <span>Sell</span>
        <Image src={RightArrow} alt=">" />
        <span>Active Listings</span>
      </div>
      <Listings view="active" />
    </div>
  );
}
