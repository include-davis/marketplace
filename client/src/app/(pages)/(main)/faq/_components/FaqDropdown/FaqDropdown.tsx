'use client';

import { ReactNode, useState } from 'react';
import styles from './FaqDrop.module.scss';
import Image from 'next/image';
import UpIcon from '@/../public/faq/arrowUp.svg';

export default function FaqDropdown({
  header,
  children,
}: {
  header: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.faqDropdown}>
      <button
        className={styles.faqHeader}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2>{header}</h2>
        <Image
          src={UpIcon}
          alt="Dropdown arrow"
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
        />
      </button>
      {isOpen && <div className={styles.faqContent}>{children}</div>}
    </div>
  );
}
