"use client";

import styles from "./Option.module.css";
import Image from "next/image";

interface OptionProps {
    src: string;
    label: string;
    onClick?: () => void;
}

export function Option({ src, label, onClick }: OptionProps) {
    return (
        <button className={styles.buttonContainer} onClick={onClick}>
            <Image src={src} alt={label} width={100} height={100} className={styles.buttonImage} />
            <span className={styles.buttonText}>{label}</span>
        </button>
    )
}