import type { Prisma } from '../generated/prisma/client.js';

export type ProjectData = Pick<Prisma.ProjectCreateInput, 'name' | 'baseUrl'>;
