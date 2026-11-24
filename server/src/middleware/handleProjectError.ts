import type { ErrorRequestHandler } from 'express';

export const handleProjectError: ErrorRequestHandler = (err: unknown, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  const status = err instanceof Error && 'status' in err ? err.status : undefined;
  if (status === 400 || status === 413) {
    res.status(status).json({ message: status === 400 ? 'Invalid request body.' : 'Request body is too large.' });
    return;
  }
  const code = err instanceof Error && 'code' in err ? err.code : undefined;
  console.error('Projects request failed', typeof code === 'string' && /^P\d{4}$/.test(code) ? code : '');
  res.status(500).json({ message: 'Could not complete the project request.' });
};
