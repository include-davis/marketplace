'use client';
import styles from './CreateStaticPostDropdown.module.scss';
import Image from 'next/image';

export default function CreateStaticPostDropdown({ value }: { value: string }) {
  const displayText = value;

  return (
    <div className={styles.dropdown}>
      <button type="button" className={styles.header}>
        <h2 className={styles.label}>{displayText}</h2>
        <Image
          src="/dropdownSymbolUp.svg"
          alt="Expanded"
          width={10}
          height={6}
          className={styles.arrow}
        />
      </button>
    </div>
  );
}
