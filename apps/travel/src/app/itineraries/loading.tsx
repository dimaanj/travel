import { Typography } from '@org/shared-ui';
import styles from './loading.module.css';

export default function ItinerariesLoading() {
  return (
    <div className={styles.root}>
      <Typography variant="h2" component="h1" muted className={styles.title}>
        My itineraries
      </Typography>
      <div className={styles.skeletonList}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={styles.skeletonItem}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
