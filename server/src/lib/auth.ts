import { betterAuth } from 'better-auth';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { clientOrigin } from '../config/clientOrigin.js';
import { getPrismaClient } from '../database/db.js';

const { BETTER_AUTH_SECRET, BETTER_AUTH_URL } = process.env;

if (!BETTER_AUTH_URL || !BETTER_AUTH_SECRET || BETTER_AUTH_SECRET.length < 32) {
  throw new Error('Set BETTER_AUTH_URL and a BETTER_AUTH_SECRET of at least 32 characters');
}

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
  trustedOrigins: [clientOrigin],
  secret: BETTER_AUTH_SECRET,
  database: prismaAdapter(getPrismaClient(), {
    provider: 'postgresql',
    transaction: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
