'use client';
import styles from './FilterDropdown.module.scss';
import { useState } from 'react';
import Image from 'next/image';

export default function FilterDropdown({
  label,
  options,
  checkedOptions,
  handleOption,
  singleSelect = false,
}: {
  label: string;
  options: string[];
  checkedOptions: Set<string> | string | null;
  handleOption: (option: string) => void;
  singleSelect?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  // Function to check if an option has been selected
  const isChecked = (option: string): boolean => {
    if (singleSelect) {
      return checkedOptions === option;
    }
    return (checkedOptions as Set<string>).has(option);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.header} onClick={toggleOpen}>
        <h2 className={styles.label}>{label}</h2>
        <Image
          src={isOpen ? '/dropdownSymbolUp.svg' : '/dropdownSymbolDown.svg'}
          alt={isOpen ? 'Collapsed' : 'Expanded'}
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
                onClick={() => handleOption(option)}
              >
                <Image
                  src={
                    isChecked(option)
                      ? '/checked_checkbox.svg'
                      : '/blank_checkbox.svg'
                  }
                  alt={isChecked(option) ? 'Checked' : 'Unchecked'}
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
