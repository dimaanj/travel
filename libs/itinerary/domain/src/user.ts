/**
 * User domain model
 * Represents a user in the system
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User ID value object
 */
export type UserId = string;
