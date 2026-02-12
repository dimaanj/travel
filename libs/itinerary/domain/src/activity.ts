/**
 * Activity domain model
 * Represents a single activity in an itinerary
 */
export interface Activity {
  id: string;
  title: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  location?: Location;
  cost?: number;
  currency?: string;
  category?: ActivityCategory;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Location value object
 */
export interface Location {
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  country?: string;
}

/**
 * Activity category enum
 */
export enum ActivityCategory {
  ACCOMMODATION = 'accommodation',
  TRANSPORTATION = 'transportation',
  FOOD = 'food',
  SIGHTSEEING = 'sightseeing',
  ENTERTAINMENT = 'entertainment',
  SHOPPING = 'shopping',
  OTHER = 'other',
}

/**
 * Activity ID value object
 */
export type ActivityId = string;
