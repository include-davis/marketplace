import { useState } from 'react';
import ActionButton from '../ActionButton/ActionButton';
import Checkbox from '../Checkbox/Checkbox';
import styles from './SellActions.module.scss';

export default function SellActions({
  view,
}: {
  view: 'active' | 'inactive' | 'drafts' | 'completed';
}) {
  const [selectAll, setSelectAll] = useState(false);
  return (
    <div className={styles.sellActions}>
      <div className={styles.selectAction}>
        <Checkbox
          isChecked={selectAll}
          setIsChecked={setSelectAll}
          id="selectAllCheckbox"
        />
        <label className={styles.selectAllLabel} htmlFor="selectAllCheckbox">
          Select all
        </label>
      </div>
      {view === 'active' && (
        <ActionButton label="List an item" href={'/sell/create-listing'} />
      )}
      {view === 'active' && (
        <ActionButton
          label="Mark Inactive"
          onClick={() => console.log('mark inactive')}
        />
      )}
      {view === 'inactive' && (
        <ActionButton
          label="Mark Active"
          onClick={() => console.log('mark active')}
        />
      )}
    </div>
  );
}
