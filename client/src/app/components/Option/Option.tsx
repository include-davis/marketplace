"use client";

import styles from "./Option.module.css";
import Image from "next/image";

interface OptionProps {
    src: string;
    label: string;
}

export function Option({ src, label }: OptionProps) {
    return (
        <div className={styles.buttonContainer}>
            <Image src={src} alt={label} width={100} height={100} className={styles.menu} />
            <div className={styles.buttonText}>{label}</div>
        </div>
    )
}