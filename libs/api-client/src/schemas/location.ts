import { z } from 'zod';

export const locationSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export type LocationDto = z.infer<typeof locationSchema>;
