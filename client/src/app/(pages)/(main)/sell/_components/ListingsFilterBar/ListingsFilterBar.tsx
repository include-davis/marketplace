import { FilterItem, FilterType } from '../../_utils/listings-utils';
import styles from './ListingsFilterBar.module.scss';

const FILTER_ITEMS: FilterItem[] = [
  { name: 'active', count: 10 },
  { name: 'inactive', count: 3 },
  { name: 'drafts', count: 4 },
  { name: 'completed', count: 2 },
];

export default function ListingsFilterBar({
  selected,
}: {
  selected: FilterType;
}) {
  return (
    <div className={styles.listingsFilterBar}>
      <h3 className={styles.listingsFilterHeading}>Listings</h3>
      {FILTER_ITEMS.map((item) => (
        <ListingsFilterItem
          key={item.name}
          item={item}
          selected={item.name === selected}
        />
      ))}
    </div>
  );
}

function ListingsFilterItem({
  item,
  selected,
}: {
  item: FilterItem;
  selected: boolean;
}) {
  const capitalizedName =
    item.name.charAt(0).toUpperCase() + item.name.slice(1);

  return (
    <div className={`${styles.filterItem} ${selected && styles.filterItemSelected}`}>
      <span className={styles.filterItemName}>{capitalizedName}</span>
      <span className={styles.filterItemCount}>{item.count}</span>
    </div>
  );
}
