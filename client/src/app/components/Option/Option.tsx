"use client";

import styles from "./Option.module.scss";
import Image from "next/image";

export default function Option({
  src,
  label,
  onClick,
}: {
  src: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button className={styles.buttonContainer} onClick={onClick}>
      <Image
        src={src}
        alt={label}
        width={100}
        height={100}
        className={styles.buttonImage}
      />
      <span className={styles.buttonText}>{label}</span>
    </button>
  );
}
