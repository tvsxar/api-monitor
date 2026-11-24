import type { NextFunction, Request, Response } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../lib/auth.js';

export type SessionLocals = { session: typeof auth.$Infer.Session };

export async function requireSession(
  req: Request,
  res: Response<unknown, SessionLocals>,
  next: NextFunction,
) {
  res.set('Cache-Control', 'no-store');
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  if (!session) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  res.locals.session = session;
  next();
}
