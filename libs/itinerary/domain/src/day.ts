import { Activity, ActivityId } from './activity';

/**
 * Day domain model
 * Represents a single day in an itinerary
 */
export interface Day {
  id: string;
  date: Date;
  activities: Activity[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Day ID value object
 */
export type DayId = string;

/**
 * Helper function to add an activity to a day
 */
export function addActivityToDay(day: Day, activity: Activity): Day {
  return {
    ...day,
    activities: [...day.activities, activity],
    updatedAt: new Date(),
  };
}

/**
 * Helper function to remove an activity from a day
 */
export function removeActivityFromDay(day: Day, activityId: ActivityId): Day {
  return {
    ...day,
    activities: day.activities.filter((activity) => activity.id !== activityId),
    updatedAt: new Date(),
  };
}

/**
 * Helper function to reorder activities in a day
 */
export function reorderActivitiesInDay(
  day: Day,
  activityIds: ActivityId[]
): Day {
  const activityMap = new Map(day.activities.map((a) => [a.id, a]));
  const reorderedActivities = activityIds
    .map((id) => activityMap.get(id))
    .filter((activity): activity is Activity => activity !== undefined);

  return {
    ...day,
    activities: reorderedActivities,
    updatedAt: new Date(),
  };
}
