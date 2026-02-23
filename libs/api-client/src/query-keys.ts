/**
 * Query key factory for React Query
 * Centralizes keys for consistent cache invalidation
 */
export const itineraryKeys = {
  all: ['itineraries'] as const,
  lists: () => [...itineraryKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...itineraryKeys.lists(), filters ?? {}] as const,
  details: () => [...itineraryKeys.all, 'detail'] as const,
  detail: (id: string) => [...itineraryKeys.details(), id] as const,
  activities: (itineraryId: string) =>
    [...itineraryKeys.detail(itineraryId), 'activities'] as const,
  budget: (itineraryId: string) =>
    [...itineraryKeys.detail(itineraryId), 'budget'] as const,
};
