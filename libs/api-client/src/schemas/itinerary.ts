import { z } from 'zod';
import { daySchema } from './day';
import { budgetSchema } from './budget';

export const itinerarySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  days: z.array(daySchema),
  budget: budgetSchema.optional(),
  ownerId: z.string(),
  collaborators: z.array(z.string()),
  isPublic: z.boolean(),
  tags: z.array(z.string()).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createItinerarySchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  ownerId: z.string().optional(),
});

export const updateItinerarySchema = createItinerarySchema.partial();

export type ItineraryDto = z.infer<typeof itinerarySchema>;
export type CreateItineraryDto = z.infer<typeof createItinerarySchema>;
export type UpdateItineraryDto = z.infer<typeof updateItinerarySchema>;
