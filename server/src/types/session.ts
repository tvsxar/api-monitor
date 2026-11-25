import type { auth } from '../lib/auth.js';

export type SessionLocals = { session: typeof auth.$Infer.Session };
