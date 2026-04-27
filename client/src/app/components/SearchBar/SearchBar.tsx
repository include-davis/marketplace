"use client";

import Image from "next/image";
import styles from "./SearchBar.module.scss";

export function SearchBar() {
  return (
    <div className={styles.searchBarWrapper}>
      <Image src="/Navbar/search-icon.svg" alt="search" width={80} height={80} className={styles.searchIcon} />

      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search"
      />
    </div>
  );
}
