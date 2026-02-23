/**
 * Seed script: run with `npx prisma db seed`
 * Creates a sample itinerary for development.
 */
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const dbUrl =
  process.env.DATABASE_URL ??
  `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`;

const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.itinerary.count();
  if (count > 0) {
    console.log('Database already has data, skipping seed.');
    return;
  }

  const start = new Date();
  start.setDate(start.getDate() + 1);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  await prisma.itinerary.create({
    data: {
      title: 'Sample Trip',
      description: 'A sample itinerary',
      startDate: start,
      endDate: end,
      ownerId: 'user-1',
      collaborators: '[]',
      isPublic: false,
      days: {
        create: [
          { date: start, sortOrder: 0 },
          ...Array.from({ length: 5 }, (_, i) => {
            const d = new Date(start);
            d.setDate(d.getDate() + i + 1);
            return { date: d, sortOrder: i + 1 };
          }),
        ],
      },
    },
  });

  console.log('Seed completed: created sample itinerary.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
