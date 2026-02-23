import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getItineraryById } from '../../../lib/server-data';
import { Card, CardBody, CardHeader, Typography } from '@org/shared-ui';
import type { DayDto, ActivityDto } from '@org/api-client';
import styles from './page.module.css';

type PageProps = { params: Promise<{ id: string }> };

function formatDateRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return `${new Date(start).toLocaleDateString(undefined, opts)} – ${new Date(end).toLocaleDateString(undefined, opts)}`;
}

function formatDayDate(date: Date): string {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatActivityTime(activity: ActivityDto): string {
  if (activity.startTime && activity.endTime) {
    return `${formatTime(activity.startTime)} – ${formatTime(activity.endTime)}`;
  }
  if (activity.startTime) return formatTime(activity.startTime);
  return '';
}

export default async function ItineraryDetailPage({ params }: PageProps) {
  const { id } = await params;
  const itinerary = await getItineraryById(id);

  if (!itinerary) {
    notFound();
  }

  const { title, description, startDate, endDate, days, budget } = itinerary;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Typography variant="h2" component="h1" className={styles.title}>
          {title}
        </Typography>
        <Typography variant="body2" muted className={styles.meta}>
          {formatDateRange(startDate, endDate)}
        </Typography>
        {description ? (
          <Typography variant="body1" className={styles.description}>
            {description}
          </Typography>
        ) : null}
        <div className={styles.actions}>
          <Link href={`/itineraries/${id}/edit`} className={styles.actionLinkPrimary}>
            Edit
          </Link>
          <Link href={`/itineraries/${id}/public`} className={styles.actionLinkSecondary}>
            Share
          </Link>
        </div>
      </header>

      <ul className={styles.daysList}>
        {days.map((day: DayDto) => (
          <li key={day.id}>
            <Card padding="md" className={styles.dayCard}>
              <CardHeader>
                <div className={styles.dayHeader}>
                  <Typography variant="h4" component="h2">
                    Day {formatDayDate(day.date)}
                  </Typography>
                  {day.notes ? (
                    <Typography variant="caption" muted className={styles.dayDate}>
                      {day.notes}
                    </Typography>
                  ) : null}
                </div>
              </CardHeader>
              <CardBody>
                {day.activities.length === 0 ? (
                  <Typography variant="body2" muted>
                    No activities planned.
                  </Typography>
                ) : (
                  <ul className={styles.activitiesList}>
                    {day.activities.map((activity: ActivityDto) => (
                      <li key={activity.id} className={styles.activityItem}>
                        <span className={styles.activityTitle}>
                          {activity.title}
                        </span>
                        {(activity.startTime || activity.description || activity.cost) && (
                          <div className={styles.activityMeta}>
                            {formatActivityTime(activity) && (
                              <span>{formatActivityTime(activity)}</span>
                            )}
                            {activity.description && (
                              <span> · {activity.description}</span>
                            )}
                            {activity.cost != null && activity.currency && (
                              <span>
                                {' '}
                                · {activity.currency} {activity.cost}
                              </span>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>

      {budget && (
        <section className={styles.budgetSection}>
          <Typography variant="h4" component="h2" className={styles.budgetTitle}>
            Budget
          </Typography>
          <Typography variant="body2" className={styles.budgetSummary}>
            {budget.currency} {budget.spentAmount.toFixed(0)} / {budget.totalAmount.toFixed(0)} spent
            {budget.categories.length > 0 &&
              ` · ${budget.categories.length} categor${budget.categories.length === 1 ? 'y' : 'ies'}`}
          </Typography>
        </section>
      )}
    </div>
  );
}
