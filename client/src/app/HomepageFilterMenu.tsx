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
          <option value="Electrical Components">
            Electrical Components
          </option>
          <option value="Tools">
            Tools
          </option>
          <option value="Materials">
            Materials
          </option>
          <option value="Fasteners">
            Fasteners
          </option>
        </select>

        <select className={styles.dropdown} defaultValue="">
          <option value="" disabled>
            Price Range
          </option>
          <option value="Relevance">
            Relevance
          </option>
          <option value="Newly Listed">
            Newly Listed
          </option>
          <option value="Price: Low to High">
            Price: Low to High
          </option>
          <option value="Price: High to Low">
            Price: High to Low
          </option>
        </select>

        <select className={styles.dropdown} defaultValue="">
          <option value="" disabled>
            Sort By
          </option>
          <option value="Under $250">
            Under $250
          </option>
          <option value="$250 - $500">
            $250 - $500
          </option>
          <option value="$500 - $750">
            $500 - $750
          </option>
          <option value="$750 - $1000">
            $750 - $1000
          </option>
          <option value="$1000+">
            $1000+
          </option>
        </select>
      </div>

      <button className={styles.applyButton}>Apply</button>
    </div>
  );
}
