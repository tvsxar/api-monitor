import type { RequestHandler } from 'express';
import { AppError } from '../errors/appError.js';
import { projectInput, projectParams } from '../validation/projects.js';

export const validateProjectParams: RequestHandler = (req, _res, next) => {
  const result = projectParams.safeParse(req.params);
  if (!result.success) throw new AppError(400, result.error.issues[0].message);
  next();
};

export const validateProjectBody: RequestHandler = (req, _res, next) => {
  const result = projectInput.safeParse(req.body);
  if (!result.success) throw new AppError(400, result.error.issues[0].message);
  req.body = result.data;
  next();
};
