"use client";
import styles from "./HomepageFilterMenu.module.scss";
import React from "react";
import FilterDropdown from "../FilterDropdown/FilterDropdown";

const DROPDOWN_OPTIONS: { label: string; options: string[] }[] = [
  {
    label: "Categories",
    options: ["Electrical Components", "Tools", "Materials", "Fasteners"],
  },
  {
    label: "Price Range",
    options: [
      "Under $250",
      "$250 - $500",
      "$500 - $750",
      "$750 - $1000",
      "$1000+",
    ],
  },
  {
    label: "Sort By",
    options: [
      "Relevance",
      "Newly Listed",
      "Price: Low to High",
      "Price: High to Low",
    ],
  },
];

export default function HomepageFilterMenu() {
  return (
    <div className={styles.filterMenu}>
      <h1 className={styles.title}>Filters</h1>

      <div className={styles.dropdownGroup}>
        {DROPDOWN_OPTIONS.map(({ label, options }) => (
          <FilterDropdown key={label} label={label} options={options} />
        ))}
      </div>

      <button className={styles.applyButton}>Apply</button>
    </div>
  );
}
