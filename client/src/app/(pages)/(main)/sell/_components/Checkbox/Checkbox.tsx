import Image from 'next/image';
import styles from './Checkbox.module.scss';
import CheckboxUnchecked from '@/../public/checkbox-unchecked.svg';
import CheckboxChecked from '@/../public/checkbox-checked.svg';
import { Dispatch, SetStateAction } from 'react';

export default function Checkbox({
  isChecked,
  setIsChecked,
  id,
}: {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  id?: string;
}) {
  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        className={styles.checkbox}
        onChange={() => setIsChecked((prev) => !prev)}
        id={id}
      />
      {isChecked ? (
        <Image
          src={CheckboxChecked}
          alt="Unchecked checkbox"
          className={styles.checkboxImage}
        />
      ) : (
        <Image
          src={CheckboxUnchecked}
          alt="Unchecked checkbox"
          className={styles.checkboxImage}
        />
      )}
    </div>
  );
}
