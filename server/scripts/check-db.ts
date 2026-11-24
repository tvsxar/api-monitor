import { createPrismaClient } from '../src/database/db.js';

try {
  const prisma = createPrismaClient();

  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('PostgreSQL connection verified.');
  } finally {
    await prisma.$disconnect();
  }
} catch (error) {
  const detail = error instanceof Error && 'code' in error &&
    typeof error.code === 'string' && /^[A-Z0-9_]+$/.test(error.code)
    ? ` (${error.code})`
    : '';
  console.error(`PostgreSQL connection check failed${detail}. Check DATABASE_URL and network access.`);
  process.exitCode = 1;
}
