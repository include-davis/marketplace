'use client';

import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Image
            src="/Footer/Hashtag.svg"
            alt="Include"
            width={42}
            height={42}
            className={styles.logo}
          />
        </div>
        <div className={styles.rightPanel}>
          <a href="/">
            <p className={styles.text}>Terms and Conditions</p>
          </a>
          <a href="/">
            <p className={styles.text}>FAQ</p>
          </a>
        </div>
      </div>
    </footer>
  );
}
