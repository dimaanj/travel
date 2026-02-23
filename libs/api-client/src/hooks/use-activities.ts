import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { itineraryKeys } from '../query-keys';
import type { CreateActivityDto } from '../schemas';

export function useActivities(itineraryId: string | null | undefined) {
  return useQuery({
    queryKey: itineraryKeys.activities(itineraryId ?? ''),
    queryFn: () => apiClient.activities.list(itineraryId!),
    enabled: !!itineraryId,
  });
}

export function useCreateActivity(itineraryId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateActivityDto) =>
      apiClient.activities.create(itineraryId, body),
    onSuccess: (_, __, ___) => {
      queryClient.invalidateQueries({
        queryKey: itineraryKeys.detail(itineraryId),
      });
      queryClient.invalidateQueries({
        queryKey: itineraryKeys.activities(itineraryId),
      });
    },
  });
}
