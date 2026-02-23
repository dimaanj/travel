import { z } from 'zod';

export const budgetCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  allocatedAmount: z.number(),
  spentAmount: z.number(),
  currency: z.string(),
});

export const budgetSchema = z.object({
  id: z.string(),
  itineraryId: z.string(),
  totalAmount: z.number(),
  currency: z.string(),
  spentAmount: z.number(),
  categories: z.array(budgetCategorySchema),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type BudgetDto = z.infer<typeof budgetSchema>;
export type BudgetCategoryDto = z.infer<typeof budgetCategorySchema>;
