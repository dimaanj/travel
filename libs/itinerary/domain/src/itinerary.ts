import { Day, DayId } from './day';
import { Activity } from './activity';
import { Budget } from './budget';
import { User, UserId } from './user';

/**
 * Itinerary domain model
 * Represents a complete travel itinerary
 */
export interface Itinerary {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  days: Day[];
  budget?: Budget;
  ownerId: UserId;
  collaborators: UserId[];
  isPublic: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Itinerary ID value object
 */
export type ItineraryId = string;

/**
 * Create a new itinerary
 */
export function createItinerary(
  id: string,
  title: string,
  startDate: Date,
  endDate: Date,
  ownerId: UserId
): Itinerary {
  return {
    id,
    title,
    startDate,
    endDate,
    days: [],
    ownerId,
    collaborators: [],
    isPublic: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Add a day to an itinerary
 */
export function addDayToItinerary(
  itinerary: Itinerary,
  day: Day
): Itinerary {
  return {
    ...itinerary,
    days: [...itinerary.days, day],
    updatedAt: new Date(),
  };
}

/**
 * Remove a day from an itinerary
 */
export function removeDayFromItinerary(
  itinerary: Itinerary,
  dayId: DayId
): Itinerary {
  return {
    ...itinerary,
    days: itinerary.days.filter((day) => day.id !== dayId),
    updatedAt: new Date(),
  };
}

/**
 * Add a collaborator to an itinerary
 */
export function addCollaborator(
  itinerary: Itinerary,
  userId: UserId
): Itinerary {
  if (itinerary.collaborators.includes(userId)) {
    return itinerary;
  }
  return {
    ...itinerary,
    collaborators: [...itinerary.collaborators, userId],
    updatedAt: new Date(),
  };
}

/**
 * Remove a collaborator from an itinerary
 */
export function removeCollaborator(
  itinerary: Itinerary,
  userId: UserId
): Itinerary {
  return {
    ...itinerary,
    collaborators: itinerary.collaborators.filter((id) => id !== userId),
    updatedAt: new Date(),
  };
}

/**
 * Check if a user can edit an itinerary
 */
export function canUserEditItinerary(
  itinerary: Itinerary,
  userId: UserId
): boolean {
  return (
    itinerary.ownerId === userId || itinerary.collaborators.includes(userId)
  );
}
