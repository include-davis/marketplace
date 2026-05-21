"use client";
import styles from "./FilterDropdown.module.scss";
import React, { useState } from "react";
import Image from "next/image";

export default function FilterDropdown({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedOptions, setCheckedOptions] = useState<Set<string>>(new Set());

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const toggleOption = (option: string) => {
    setCheckedOptions((prev) => {
      const next = new Set(prev);

      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }

      return next;
    });
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.header} onClick={toggleOpen}>
        <h2 className={styles.label}>{label}</h2>
        <Image
          src={isOpen ? "/dropdownSymbolUp.svg" : "/dropdownSymbolDown.svg"}
          alt={isOpen ? "Collapsed" : "Expanded"}
          width={15}
          height={9}
          className={styles.arrow}
        />
      </button>

      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map((option) => (
            <li key={option}>
              <button
                className={styles.optionButton}
                onClick={() => toggleOption(option)}
              >
                <Image
                  src={
                    checkedOptions.has(option)
                      ? "/checked_checkbox.svg"
                      : "/blank_checkbox.svg"
                  }
                  alt={checkedOptions.has(option) ? "Checked" : "Unchecked"}
                  width={24}
                  height={24}
                  className={styles.checkbox}
                />

                <h4 className={styles.optionLabel}>{option}</h4>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
