/**
 * Prisma client with SQLite adapter (Prisma 7) and data access layer.
 * Maps DB models to API DTOs (@org/api-client).
 */
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import type { ItineraryDto, ActivityDto, BudgetDto } from '@org/api-client';

const dbUrl =
  process.env.DATABASE_URL ??
  `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`;

const adapter = new PrismaBetterSqlite3({ url: dbUrl });
export const prisma = new PrismaClient({ adapter });

// --- Mappers: Prisma → API DTOs ---

function parseJson<T>(s: string | null, fallback: T): T {
  if (s == null || s === '') return fallback;
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

function toActivityDto(a: {
  id: string;
  title: string;
  description: string | null;
  startTime: Date | null;
  endTime: Date | null;
  location: string | null;
  cost: number | null;
  currency: string | null;
  category: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}): ActivityDto {
  return {
    id: a.id,
    title: a.title,
    description: a.description ?? undefined,
    startTime: a.startTime ?? undefined,
    endTime: a.endTime ?? undefined,
    location: a.location ? (parseJson(a.location, null) ?? undefined) : undefined,
    cost: a.cost ?? undefined,
    currency: a.currency ?? undefined,
    category: a.category as ActivityDto['category'],
    notes: a.notes ?? undefined,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  };
}

function toBudgetDto(b: {
  id: string;
  itineraryId: string;
  totalAmount: number;
  currency: string;
  spentAmount: number;
  createdAt: Date;
  updatedAt: Date;
  categories: Array<{
    id: string;
    name: string;
    allocatedAmount: number;
    spentAmount: number;
    currency: string;
  }>;
}): BudgetDto {
  return {
    id: b.id,
    itineraryId: b.itineraryId,
    totalAmount: b.totalAmount,
    currency: b.currency,
    spentAmount: b.spentAmount,
    categories: b.categories.map((c) => ({
      id: c.id,
      name: c.name,
      allocatedAmount: c.allocatedAmount,
      spentAmount: c.spentAmount,
      currency: c.currency,
    })),
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  };
}

function toItineraryDto(row: {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  ownerId: string;
  collaborators: string;
  isPublic: boolean;
  tags: string | null;
  createdAt: Date;
  updatedAt: Date;
  days: Array<{
    id: string;
    date: Date;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    activities: Array<{
      id: string;
      title: string;
      description: string | null;
      startTime: Date | null;
      endTime: Date | null;
      location: string | null;
      cost: number | null;
      currency: string | null;
      category: string | null;
      notes: string | null;
      createdAt: Date;
      updatedAt: Date;
    }>;
  }>;
  budget: {
    id: string;
    itineraryId: string;
    totalAmount: number;
    currency: string;
    spentAmount: number;
    createdAt: Date;
    updatedAt: Date;
    categories: Array<{
      id: string;
      name: string;
      allocatedAmount: number;
      spentAmount: number;
      currency: string;
    }>;
  } | null;
}): ItineraryDto {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    startDate: row.startDate,
    endDate: row.endDate,
    days: row.days
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((d) => ({
        id: d.id,
        date: d.date,
        activities: d.activities.map(toActivityDto),
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      })),
    budget: row.budget ? toBudgetDto(row.budget) : undefined,
    ownerId: row.ownerId,
    collaborators: parseJson<string[]>(row.collaborators, []),
    isPublic: row.isPublic,
    tags: row.tags ? parseJson<string[]>(row.tags, []) : undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

// --- Data access (async, returns DTOs) ---

export const db = {
  itineraries: {
    getAll: async (): Promise<ItineraryDto[]> => {
      const list = await prisma.itinerary.findMany({
        include: {
          days: { include: { activities: { orderBy: { sortOrder: 'asc' } } }, orderBy: { date: 'asc' } },
          budget: { include: { categories: true } },
        },
      });
      return list.map(toItineraryDto);
    },

    get: async (id: string): Promise<ItineraryDto | null> => {
      const row = await prisma.itinerary.findUnique({
        where: { id },
        include: {
          days: { include: { activities: { orderBy: { sortOrder: 'asc' } } }, orderBy: { date: 'asc' } },
          budget: { include: { categories: true } },
        },
      });
      return row ? toItineraryDto(row) : null;
    },

    create: async (data: {
      title: string;
      description?: string;
      startDate: Date;
      endDate: Date;
      ownerId?: string;
      days: Array<{ date: Date; notes?: string }>;
    }): Promise<ItineraryDto> => {
      const itinerary = await prisma.itinerary.create({
        data: {
          title: data.title,
          description: data.description ?? null,
          startDate: data.startDate,
          endDate: data.endDate,
          ownerId: data.ownerId ?? 'anonymous',
          collaborators: '[]',
          isPublic: false,
          days: {
            create: data.days.map((d, i) => ({
              date: d.date,
              notes: d.notes ?? null,
              sortOrder: i,
            })),
          },
        },
        include: {
          days: { include: { activities: { orderBy: { sortOrder: 'asc' } } }, orderBy: { date: 'asc' } },
          budget: { include: { categories: true } },
        },
      });
      return toItineraryDto(itinerary);
    },

    update: async (
      id: string,
      data: Partial<{
        title: string;
        description: string;
        startDate: Date;
        endDate: Date;
      }>
    ): Promise<ItineraryDto | null> => {
      const existing = await prisma.itinerary.findUnique({ where: { id } });
      if (!existing) return null;
      const row = await prisma.itinerary.update({
        where: { id },
        data: {
          ...(data.title != null && { title: data.title }),
          ...(data.description !== undefined && { description: data.description || null }),
          ...(data.startDate != null && { startDate: data.startDate }),
          ...(data.endDate != null && { endDate: data.endDate }),
        },
        include: {
          days: { include: { activities: { orderBy: { sortOrder: 'asc' } } }, orderBy: { date: 'asc' } },
          budget: { include: { categories: true } },
        },
      });
      return toItineraryDto(row);
    },

    delete: async (id: string): Promise<boolean> => {
      const result = await prisma.itinerary.deleteMany({ where: { id } });
      return result.count > 0;
    },
  },

  activities: {
    list: async (itineraryId: string): Promise<ActivityDto[]> => {
      const days = await prisma.day.findMany({
        where: { itineraryId },
        include: { activities: true },
        orderBy: { date: 'asc' },
      });
      return days.flatMap((d) => d.activities.map(toActivityDto));
    },

    add: async (
      itineraryId: string,
      dayId: string,
      data: Omit<ActivityDto, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<ActivityDto | null> => {
      const day = await prisma.day.findFirst({
        where: { id: dayId, itineraryId },
      });
      if (!day) return null;
      const activity = await prisma.activity.create({
        data: {
          dayId,
          title: data.title,
          description: data.description ?? null,
          startTime: data.startTime ?? null,
          endTime: data.endTime ?? null,
          location: data.location ? JSON.stringify(data.location) : null,
          cost: data.cost ?? null,
          currency: data.currency ?? null,
          category: data.category ?? null,
          notes: data.notes ?? null,
        },
      });
      return toActivityDto(activity);
    },
  },

  budget: {
    get: async (itineraryId: string): Promise<BudgetDto | null> => {
      const b = await prisma.budget.findUnique({
        where: { itineraryId },
        include: { categories: true },
      });
      return b ? toBudgetDto(b) : null;
    },

    ensure: async (itineraryId: string): Promise<BudgetDto> => {
      let b = await prisma.budget.findUnique({
        where: { itineraryId },
        include: { categories: true },
      });
      if (!b) {
        b = await prisma.budget.create({
          data: {
            itineraryId,
            totalAmount: 0,
            currency: 'USD',
            spentAmount: 0,
          },
          include: { categories: true },
        });
      }
      return toBudgetDto(b);
    },
  },
};
