import Image from "next/image";
import styles from "./page.module.scss";
import React from "react";
import HomepageFilterMenu from "../_components/HomepageFilterMenu/HomepageFilterMenu";

export default function Home() {
  return (
    <div>
      <h1 className={styles.searchHeading}>
        Search Results for &ldquo;X&rdquo;
      </h1>

      <div className={styles.contentRow}>
        <HomepageFilterMenu />
      </div>
    </div>
  );
}
