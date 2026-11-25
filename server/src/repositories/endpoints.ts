import { getPrismaClient } from '../database/db.js';
import { Prisma } from '../generated/prisma/client.js';
import type { EndpointSettings } from '../types/endpoint.js';

const prisma = getPrismaClient();

export function findProjectByOwner(ownerId: string, projectId: string) {
  return prisma.project.findUnique({ where: { id: projectId, ownerId }, select: { id: true } });
}

export function findEndpointsByProject(projectId: string) {
  return prisma.endpoint.findMany({
    where: { projectId },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
  });
}

export function createEndpointWithinLimit(
  ownerId: string,
  projectId: string,
  data: EndpointSettings,
  limit: number,
) {
  return prisma.$transaction(async (tx) => {
    const [project] = await tx.$queryRaw<{ id: string }[]>`
      SELECT "id" FROM "project"
      WHERE "id" = ${projectId} AND "ownerId" = ${ownerId}
      FOR UPDATE
    `;
    if (!project) return { outcome: 'projectNotFound' } as const;

    const count = await tx.endpoint.count({ where: { projectId } });
    if (count >= limit) return { outcome: 'limitReached' } as const;

    const endpoint = await tx.endpoint.create({ data: { ...pickSettings(data), projectId } });
    return { outcome: 'created', endpoint } as const;
  });
}

export async function updateEndpoint(ownerId: string, projectId: string, endpointId: string, data: EndpointSettings) {
  try {
    return await prisma.endpoint.update({
      where: { id: endpointId, projectId, project: { ownerId } },
      data: pickSettings(data),
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') return null;
    throw err;
  }
}

export async function deleteEndpoint(ownerId: string, projectId: string, endpointId: string) {
  const { count } = await prisma.endpoint.deleteMany({
    where: { id: endpointId, projectId, project: { ownerId } },
  });
  return count === 1;
}

function pickSettings({ name, path, intervalSeconds, timeoutMs, expectedStatus }: EndpointSettings) {
  return { name, path, intervalSeconds, timeoutMs, expectedStatus };
}
