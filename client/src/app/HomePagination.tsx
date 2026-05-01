'use client';

import React from 'react';
import Image from 'next/image';
import styles from './HomePagination.module.scss';

export default function HomePagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Show up to 4 page numbers at all times, then "...", and then the last page number
    const pages: (number | '...')[] = [];
    const maxVisible = 4;

    // Find the window of up to 4 consecutive pages around currentPage, defined by [start, end]
    // start is the page number that shows up at the very beginning of the pagination
    // end is the last page number seen before "..."
    let start = Math.max(1, currentPage - 2);
    let end = start + maxVisible - 1;

    // Handles cases where end includes the last page
    if (end >= totalPages) {
      // Last cell should always be the final page number, so manually set end to be
      // 1 position before that and calculate start based on end
      end = totalPages - 1;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add "..." if there are at least 2 pages between the end of the current window and the last page
    if (end < totalPages - 2) {
      pages.push('...');
    }
    // If there is exactly one page being hidden, then skip the "..." and directly add the second-last page
    if (end == totalPages - 2) {
      pages.push(totalPages - 1);
    }
    // Add the last page number if it isn't already in the current window
    if (end < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Image src="/leftArrow.svg" alt="Previous" width={20} height={32} />
      </button>

      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span key={`dots${index}`} className={styles.dots}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ''
            }`}
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </button>
        )
      )}

      <button
        className={styles.arrowButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Image src="/rightArrow.svg" alt="Next" width={20} height={32} />
      </button>
    </div>
  );
}
