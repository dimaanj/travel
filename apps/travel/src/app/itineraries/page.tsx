import Link from 'next/link';
import { getItinerariesList } from '../../lib/server-data';
import { Card, CardBody, Typography } from '@org/shared-ui';
import type { ItineraryDto } from '@org/api-client';
import styles from './page.module.css';

function formatDateRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return `${new Date(start).toLocaleDateString(undefined, opts)} – ${new Date(end).toLocaleDateString(undefined, opts)}`;
}

export default async function ItinerariesPage() {
  const itineraries = await getItinerariesList();

  if (itineraries.length === 0) {
    return (
      <div className={styles.root}>
        <Typography variant="h2" component="h1" className={styles.title}>
          My itineraries
        </Typography>
        <Card padding="lg" className={styles.emptyCard}>
          <CardBody>
            <Typography variant="body1" muted>
              No itineraries yet. Create one to get started.
            </Typography>
            <Typography variant="body2" muted className={styles.emptyNote}>
              (Create itinerary form coming in a later step.)
            </Typography>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Typography variant="h2" component="h1" className={styles.title}>
        My itineraries
      </Typography>
      <ul className={styles.list}>
        {itineraries.map((itinerary: ItineraryDto) => (
          <li key={itinerary.id}>
            <Link
              href={`/itineraries/${itinerary.id}`}
              className={styles.itemLink}
            >
              <Card interactive padding="md">
                <CardBody>
                  <Typography variant="h4" component="h2">
                    {itinerary.title}
                  </Typography>
                  <Typography variant="body2" muted className={styles.cardMeta}>
                    {formatDateRange(itinerary.startDate, itinerary.endDate)}
                  </Typography>
                  {itinerary.description ? (
                    <Typography
                      variant="body2"
                      muted
                      className={styles.cardDescription}
                    >
                      {itinerary.description}
                    </Typography>
                  ) : null}
                </CardBody>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
