import { z } from 'zod';
import { activitySchema } from './activity';

export const daySchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  activities: z.array(activitySchema),
  notes: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type DayDto = z.infer<typeof daySchema>;
