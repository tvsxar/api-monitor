import type { RequestHandler } from 'express';
import { clientOrigin } from '../config/clientOrigin.js';
import { AppError } from '../errors/appError.js';

export const requireClientOrigin: RequestHandler = (req, _res, next) => {
  const changesData = req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE';
  if (changesData && req.get('Origin') !== clientOrigin) {
    throw new AppError(403, 'Request origin is not allowed.');
  }
  next();
};
