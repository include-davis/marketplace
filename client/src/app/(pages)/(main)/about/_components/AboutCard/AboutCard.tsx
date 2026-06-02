import styles from './AboutCard.module.scss';

export default function AboutCard({
  header,
  content,
}: {
  header: string;
  content: string;
}) {
  return (
    <div className={styles.aboutCard}>
      <h3>{header}</h3>
      <p>{content}</p>
    </div>
  );
}
