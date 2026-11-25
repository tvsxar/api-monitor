import type { Prisma } from '../generated/prisma/client.js';

export type EndpointSettings = Pick<
  Prisma.EndpointCreateInput,
  'name' | 'path' | 'intervalSeconds' | 'timeoutMs' | 'expectedStatus'
>;
