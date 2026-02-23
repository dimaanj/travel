import { z } from 'zod';
import { locationSchema } from './location';

export const activityCategorySchema = z.enum([
  'accommodation',
  'transportation',
  'food',
  'sightseeing',
  'entertainment',
  'shopping',
  'other',
]);

export const activitySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional(),
  location: locationSchema.optional(),
  cost: z.number().optional(),
  currency: z.string().optional(),
  category: activityCategorySchema.optional(),
  notes: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createActivitySchema = activitySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    dayId: z.string().min(1),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
  });

export type ActivityDto = z.infer<typeof activitySchema>;
export type CreateActivityDto = z.infer<typeof createActivitySchema>;
