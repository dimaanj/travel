'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
} from '@org/shared-ui';
import {
  useItinerary,
  useUpdateItinerary,
} from '@org/api-client';
import type { DayDto, ActivityDto } from '@org/api-client';
import styles from './page.module.css';

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

export default function ItineraryEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id ?? null;

  const { data: itinerary, isLoading, isError, error } = useItinerary(id);
  const updateItinerary = useUpdateItinerary(id ?? '');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (itinerary) {
      setTitle(itinerary.title);
      setDescription(itinerary.description ?? '');
    }
  }, [itinerary]);

  const handleSave = useCallback(() => {
    if (!id || !id.trim()) return;
    updateItinerary.mutate(
      { title: title.trim() || undefined, description: description.trim() || undefined },
      {
        onSuccess: () => {
          router.push(`/itineraries/${id}`);
        },
      }
    );
  }, [id, title, description, updateItinerary, router]);

  if (!id) {
    return (
      <div className={styles.root}>
        <Typography variant="h3" component="h1" className={styles.notFoundTitle}>
          Invalid itinerary
        </Typography>
        <Link href="/itineraries" className={styles.backLink}>
          Back to list
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.root}>
        <Link href={`/itineraries/${id}`} className={styles.backLink}>
          ← Back to itinerary
        </Link>
        <Typography variant="body1" muted className={styles.loading}>
          Loading…
        </Typography>
      </div>
    );
  }

  if (isError || !itinerary) {
    return (
      <div className={styles.root}>
        <Link href="/itineraries" className={styles.backLink}>
          ← Back to list
        </Link>
        <div className={styles.notFound}>
          <Typography variant="h3" component="h1" className={styles.notFoundTitle}>
            Itinerary not found
          </Typography>
          <Typography variant="body2" muted>
            This itinerary may have been deleted or the link is invalid.
          </Typography>
          <Link href="/itineraries" className={styles.backLink}>
            Back to list
          </Link>
        </div>
      </div>
    );
  }

  const { days } = itinerary;
  const hasChanges =
    title !== itinerary.title ||
    (description ?? '') !== (itinerary.description ?? '');

  return (
    <div className={styles.root}>
      <Link href={`/itineraries/${id}`} className={styles.backLink}>
        ← Back to itinerary
      </Link>

      <header className={styles.header}>
        <div className={styles.titleField}>
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Itinerary title"
            aria-label="Itinerary title"
          />
        </div>
        <div className={styles.descriptionField}>
          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            aria-label="Description"
          />
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleSave}
            className={styles.saveButton}
            disabled={!hasChanges || updateItinerary.isPending}
          >
            {updateItinerary.isPending ? 'Saving…' : 'Save'}
          </button>
          <Link href={`/itineraries/${id}`} className={styles.cancelLink}>
            Cancel
          </Link>
        </div>
        {updateItinerary.isError && (
          <Typography variant="body2" className={styles.errorMessage}>
            {updateItinerary.error instanceof Error
              ? updateItinerary.error.message
              : 'Failed to save'}
          </Typography>
        )}
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
                        {(activity.startTime ||
                          activity.description ||
                          activity.cost) && (
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
    </div>
  );
}
