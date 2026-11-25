import { getPrismaClient } from '../database/db.js';
import { Prisma } from '../generated/prisma/client.js';
import type { ProjectData } from '../types/project.js';

const prisma = getPrismaClient();
const projectFields = { id: true, name: true, baseUrl: true, createdAt: true, updatedAt: true } as const;

export function findProjectsByOwner(ownerId: string) {
  return prisma.project.findMany({
    where: { ownerId },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    select: projectFields,
  });
}

export function findProjectWithEndpoints(ownerId: string, projectId: string) {
  return prisma.project.findUnique({
    where: { id: projectId, ownerId },
    select: {
      ...projectFields,
      endpoints: {
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        select: {
          id: true,
          projectId: true,
          name: true,
          path: true,
          intervalSeconds: true,
          timeoutMs: true,
          expectedStatus: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

export function createProjectWithinLimit(ownerId: string, data: ProjectData, limit: number) {
  return prisma.$transaction(async (tx) => {
    const [owner] = await tx.$queryRaw<{ id: string }[]>`
      SELECT "id" FROM "user"
      WHERE "id" = ${ownerId}
      FOR UPDATE
    `;
    if (!owner) return { outcome: 'ownerNotFound' } as const;

    const count = await tx.project.count({ where: { ownerId } });
    if (count >= limit) return { outcome: 'limitReached' } as const;

    const project = await tx.project.create({ data: { ...data, ownerId }, select: projectFields });
    return { outcome: 'created', project } as const;
  });
}

export async function updateProjectByOwner(ownerId: string, id: string, data: ProjectData) {
  try {
    return await prisma.project.update({ where: { id, ownerId }, data, select: projectFields });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') return null;
    throw err;
  }
}
