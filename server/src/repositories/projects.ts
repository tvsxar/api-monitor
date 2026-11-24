import { getPrismaClient } from '../database/db.js';
import { Prisma } from '../generated/prisma/client.js';

export type ProjectData = Pick<Prisma.ProjectCreateInput, 'name' | 'baseUrl'>;

const prisma = getPrismaClient();
const maxTransactionAttempts = 5;
const projectFields = { id: true, name: true, baseUrl: true, createdAt: true, updatedAt: true } as const;

type ProjectRecord = Prisma.ProjectGetPayload<{ select: typeof projectFields }>;

type ProjectCreationQueries = {
  countProjects: () => Promise<number>;
  insertProject: (data: ProjectData) => Promise<ProjectRecord>;
};

export function findProjectsByOwner(ownerId: string) {
  return prisma.project.findMany({
    where: { ownerId },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    select: projectFields,
  });
}

export async function withProjectCreationTransaction<T>(
  ownerId: string,
  run: (queries: ProjectCreationQueries) => Promise<T>,
): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await prisma.$transaction(
        (tx) => run({
          countProjects: () => tx.project.count({ where: { ownerId } }),
          insertProject: (data) => tx.project.create({
            data: { ...data, ownerId },
            select: projectFields,
          }),
        }),
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (err) {
      if (!isPrismaError(err, 'P2034') || attempt === maxTransactionAttempts) {
        throw err;
      }
    }
  }
}

export async function updateProjectByOwner(ownerId: string, id: string, data: ProjectData) {
  try {
    return await prisma.project.update({ where: { id, ownerId }, data, select: projectFields });
  } catch (err) {
    if (isPrismaError(err, 'P2025')) return null;
    throw err;
  }
}

function isPrismaError(err: unknown, code: string) {
  return err instanceof Prisma.PrismaClientKnownRequestError && err.code === code;
}
