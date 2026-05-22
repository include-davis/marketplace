'use client';
import styles from './HomepageFilterMenu.module.scss';
import FilterDropdown from '../FilterDropdown/FilterDropdown';

interface FilterState {
  categories: Set<string>;
  priceRanges: Set<string>;
  sortBy: string | null;
}

const CATEGORY_OPTIONS = [
  'Electrical Components',
  'Tools',
  'Materials',
  'Fasteners',
];
const PRICE_RANGE_OPTIONS = [
  'Under $250',
  '$250 - $500',
  '$500 - $750',
  '$750 - $1000',
  '$1000+',
];
const SORT_BY_OPTIONS = [
  'Newly Listed',
  'Price: Low to High',
  'Price: High to Low',
];

export default function HomepageFilterMenu({
  filters,
  handleCategory,
  handlePriceRange,
  handleSortBy,
  handleApply,
}: {
  filters: FilterState;
  handleCategory: (option: string) => void;
  handlePriceRange: (option: string) => void;
  handleSortBy: (option: string) => void;
  handleApply: () => void;
}) {
  return (
    <div className={styles.filterMenu}>
      <h1 className={styles.title}>Filters</h1>

      <div className={styles.dropdownGroup}>
        <FilterDropdown
          label="Categories"
          options={CATEGORY_OPTIONS}
          checkedOptions={filters.categories}
          handleOption={handleCategory}
        />

        <FilterDropdown
          label="Price Range"
          options={PRICE_RANGE_OPTIONS}
          checkedOptions={filters.priceRanges}
          handleOption={handlePriceRange}
        />

        <FilterDropdown
          label="Sort By"
          options={SORT_BY_OPTIONS}
          checkedOptions={filters.sortBy}
          handleOption={handleSortBy}
          singleSelect
        />
      </div>

      <button className={styles.applyButton} onClick={handleApply}>
        Apply
      </button>
    </div>
  );
}
