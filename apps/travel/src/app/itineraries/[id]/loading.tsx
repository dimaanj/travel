import styles from './loading.module.css';

export default function ItineraryDetailLoading() {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.titleSkeleton} />
        <div className={styles.metaSkeleton} />
      </div>
      <div className={styles.daysSkeleton}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.daySkeleton} aria-hidden />
        ))}
      </div>
    </div>
  );
}
