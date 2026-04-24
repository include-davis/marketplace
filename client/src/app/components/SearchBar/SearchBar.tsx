"use client";

import styles from "./SearchBar.module.css";

export function SearchBar() {
  return (
    <div className={styles.searchBarWrapper}>
      <svg
        className={styles.searchIcon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search"
        // value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
