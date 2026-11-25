import type { NextFunction, Request, Response } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { AppError } from '../errors/appError.js';
import { auth } from '../lib/auth.js';
import type { SessionLocals } from '../types/session.js';

export function getSessionUserId(res: Response) {
  const session: SessionLocals['session'] | undefined = res.locals.session;
  if (!session) throw new AppError(401, 'Authentication required');
  return session.user.id;
}

export async function requireSession(
  req: Request,
  res: Response,
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
