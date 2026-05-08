"use client";
import styles from "./CreatePostDropdown.module.scss";
import React, { useState } from "react";
import Image from "next/image";

export default function CreatePostDropdown({
  label,
  placeholder,
  options,
}: {
    label: string;
    placeholder: string;
    options: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  
  const displayText =
    isOpen && !selectedOption ? placeholder : selectedOption || label;

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button type="button" className={styles.header} onClick={toggleOpen}>
        <h2 className={styles.label}>{displayText}</h2>
        <Image
          src={isOpen ? "/dropdownSymbolDown.svg" : "/dropdownSymbolUp.svg"}
          alt={isOpen ? "Collapsed" : "Expanded"}
          width={10}
          height={6}
          className={styles.arrow}
        />
      </button>

      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                className={styles.optionButton}
                onClick={() => handleSelect(option)}
              >
                <h4 className={styles.optionLabel}>{option}</h4>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
