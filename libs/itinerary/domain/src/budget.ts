/**
 * Budget domain model
 * Represents the budget for an itinerary
 */
export interface Budget {
  id: string;
  itineraryId: string;
  totalAmount: number;
  currency: string;
  spentAmount: number;
  categories: BudgetCategory[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Budget category
 */
export interface BudgetCategory {
  id: string;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  currency: string;
}

/**
 * Budget ID value object
 */
export type BudgetId = string;

/**
 * Calculate remaining budget
 */
export function calculateRemainingBudget(budget: Budget): number {
  return budget.totalAmount - budget.spentAmount;
}

/**
 * Calculate budget utilization percentage
 */
export function calculateBudgetUtilization(budget: Budget): number {
  if (budget.totalAmount === 0) return 0;
  return (budget.spentAmount / budget.totalAmount) * 100;
}

/**
 * Check if budget is exceeded
 */
export function isBudgetExceeded(budget: Budget): boolean {
  return budget.spentAmount > budget.totalAmount;
}
