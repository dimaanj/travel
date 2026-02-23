/**
 * Server-only data layer for SSR/SSG pages.
 * Use only in Server Components and Route Handlers; do not import in client code.
 */
import 'server-only';

import { db } from '../app/api/db';
import type { ItineraryDto } from '@org/api-client';

/**
 * Returns all itineraries with days, activities, and budget.
 * Use for the list page (SSR).
 */
export async function getItinerariesList(): Promise<ItineraryDto[]> {
  return db.itineraries.getAll();
}

/**
 * Returns a single itinerary by id, or null if not found.
 * Use for detail, public, and (optionally) prefetch for edit pages.
 */
export async function getItineraryById(
  id: string
): Promise<ItineraryDto | null> {
  return db.itineraries.get(id);
}
