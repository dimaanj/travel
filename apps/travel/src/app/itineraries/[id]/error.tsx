'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Typography } from '@org/shared-ui';
import styles from './error.module.css';

export default function ItineraryDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Itinerary detail error:', error);
  }, [error]);

  return (
    <div className={styles.root}>
      <Typography variant="h3" component="h1">
        Something went wrong
      </Typography>
      <Typography variant="body1" muted className={styles.message}>
        We couldn’t load this itinerary. Please try again.
      </Typography>
      <div className={styles.actions}>
        <button type="button" onClick={reset} className={styles.retryButton}>
          Try again
        </button>
        <Link href="/itineraries" className={styles.backLink}>
          Back to list
        </Link>
      </div>
    </div>
  );
}
