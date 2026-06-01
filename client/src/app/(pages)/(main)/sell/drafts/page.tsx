import styles from './page.module.scss';
import RightArrow from '@/../public/rightArrow.svg';
import Listings from '../_components/Listings/Listings';
import Image from 'next/image';

export default function Drafts() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <span>Sell</span>
        <Image src={RightArrow} alt=">" />
        <span>Drafts</span>
      </div>
      <Listings view="drafts" />
    </div>
  );
}
