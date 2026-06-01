import Link from 'next/link';
import styles from './ActionButton.module.scss';

export default function ActionButton({
  label,
  onClick,
  href,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  if (onClick) {
    return (
      <button className={styles.actionButton} onClick={onClick}>
        {label}
      </button>
    );
  }

  if (href) {
    return (
      <Link className={styles.actionButton} href={href}>
        {label}
      </Link>
    );
  }

  return <div className={styles.actionButton}>{label}</div>;
}
