import type { RequestHandler } from 'express';
import { AppError } from '../errors/appError.js';
import { endpointInput, endpointParams } from '../validation/endpoints.js';

export const validateEndpointParams: RequestHandler = (req, _res, next) => {
  const result = endpointParams.safeParse(req.params);
  if (!result.success) throw new AppError(400, result.error.issues[0].message);
  next();
};

export const validateEndpointBody: RequestHandler = (req, _res, next) => {
  const result = endpointInput.safeParse(req.body);
  if (!result.success) throw new AppError(400, result.error.issues[0].message);
  req.body = result.data;
  next();
};
