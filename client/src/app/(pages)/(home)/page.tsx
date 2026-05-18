 'use client';

import styles from './page.module.scss';
import { useState } from 'react';
import HomePagination from './_components/HomePagination/HomePagination';
import HomepageFilterMenu from './_components/HomepageFilterMenu/HomepageFilterMenu';

export default function Home() {
  const totalPages = 10; // Temporary, will change once product listings are implemented
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.searchHeading}>
        Search Results for &ldquo;X&rdquo;
      </h1>

      <div className={styles.contentRow}>
        <HomepageFilterMenu />

        <div className={styles.listingsArea}>
          <HomePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
