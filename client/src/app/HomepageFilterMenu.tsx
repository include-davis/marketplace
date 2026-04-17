"use client";
import styles from "./HomepageFilterMenu.module.scss";
import React from "react";

export default function HomepageFilterMenu() {
  return (
    <div className={styles.filterMenu}>
      <h1 className={styles.title}>Filters</h1>

      <div className={styles.dropdownGroup}>
        <select className={styles.dropdown} defaultValue="">
          <option value="" disabled>
            Categories
          </option>
        </select>

        <select className={styles.dropdown} defaultValue="">
          <option value="" disabled>
            Price Range
          </option>
        </select>

        <select className={styles.dropdown} defaultValue="">
          <option value="" disabled>
            Sort By
          </option>
        </select>
      </div>

      <button className={styles.applyButton}>Apply</button>
    </div>
  );
}
