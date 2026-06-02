'use client';

import Link from 'next/link';
import styles from './Option.module.scss';
import Image from 'next/image';

export default function Option({
  src,
  label,
  href,
}: {
  src: string;
  label: string;
  href: string;
}) {
  return (
    <Link className={styles.buttonContainer} href={href}>
      <Image
        src={src}
        alt={label}
        width={100}
        height={100}
        className={styles.buttonImage}
      />
      <span className={styles.buttonText}>{label}</span>
    </Link>
  );
}
