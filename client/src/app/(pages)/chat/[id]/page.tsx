import Link from 'next/link';
import MessagesGrid from '../_components/messagesgrid/messagesgrid';
import styles from './page.module.scss';
import LeftArrow from '@/../public/leftArrow.svg';
import Image from 'next/image';
import Navbar from '@/app/_components/Navbar/Navbar';

export default function Chat() {
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.chatPageHeader}>
        <Link href="/" className={styles.headerLink}>
          <Image src={LeftArrow} alt="<" />
          <span>Back to Listings</span>
        </Link>
      </div>
      <MessagesGrid />
    </div>
  );
}
