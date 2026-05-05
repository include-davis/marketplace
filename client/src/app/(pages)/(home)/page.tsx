import Image from "next/image";
import styles from "./page.module.scss";
import React from "react";
<<<<<<< HEAD
import MessagesGrid from "@/app/(pages)/(chat)/(components)/messagesgrid/messagesgrid";

export default function Home() {
  return (
    <>
    <MessagesGrid/>
    </>
=======
import HomepageFilterMenu from "./_components/HomepageFilterMenu/HomepageFilterMenu";

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.searchHeading}>
        Search Results for &ldquo;X&rdquo;
      </h1>

      <div className={styles.contentRow}>
        <HomepageFilterMenu />
      </div>
    </div>
>>>>>>> b330e795fd652a96902361cb24f6c77e5e41188f
  );
}
