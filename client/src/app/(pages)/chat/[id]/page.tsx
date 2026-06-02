import MessagesGrid from '../_components/messagesgrid/messagesgrid';
import styles from './page.module.scss';

export default function Chat() {
  return (
    <div className={styles.page}>
      <div className={styles.chatPageHeader}></div>
      <MessagesGrid />
    </div>
  );
}
