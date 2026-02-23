import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { itineraryKeys } from '../query-keys';

export function useBudget(itineraryId: string | null | undefined) {
  return useQuery({
    queryKey: itineraryKeys.budget(itineraryId ?? ''),
    queryFn: () => apiClient.budget.get(itineraryId!),
    enabled: !!itineraryId,
  });
}
