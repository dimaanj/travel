import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { itineraryKeys } from '../query-keys';
import type { CreateItineraryDto, UpdateItineraryDto } from '../schemas';

export function useItineraries() {
  return useQuery({
    queryKey: itineraryKeys.lists(),
    queryFn: () => apiClient.itineraries.list(),
  });
}

export function useItinerary(id: string | null | undefined) {
  return useQuery({
    queryKey: itineraryKeys.detail(id ?? ''),
    queryFn: () => apiClient.itineraries.get(id!),
    enabled: !!id,
  });
}

export function useCreateItinerary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateItineraryDto) =>
      apiClient.itineraries.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itineraryKeys.lists() });
    },
  });
}

export function useUpdateItinerary(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateItineraryDto) =>
      apiClient.itineraries.update(id, body),
    onSuccess: (data) => {
      queryClient.setQueryData(itineraryKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: itineraryKeys.lists() });
    },
  });
}

export function useDeleteItinerary() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.itineraries.delete(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: itineraryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: itineraryKeys.lists() });
    },
  });
}
