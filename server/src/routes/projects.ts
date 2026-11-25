import express from 'express';
import {
  createProjectController,
  getProjectController,
  listProjectsController,
  updateProjectController,
} from '../controllers/projects.js';
import { handleProjectError } from '../middleware/handleProjectError.js';
import { requireClientOrigin } from '../middleware/requireClientOrigin.js';
import { requireSession } from '../middleware/requireSession.js';
import { validateProjectBody, validateProjectParams } from '../middleware/validateProject.js';
import { endpointsRouter } from './endpoints.js';

export const projectsRouter = express.Router();

projectsRouter.use(requireSession, requireClientOrigin, express.json({ limit: '8kb' }));
projectsRouter.get('/', listProjectsController);
projectsRouter.get('/:projectId', validateProjectParams, getProjectController);
projectsRouter.post('/', validateProjectBody, createProjectController);
projectsRouter.put('/:projectId', validateProjectParams, validateProjectBody, updateProjectController);
projectsRouter.use('/:projectId/endpoints', endpointsRouter);
projectsRouter.use(handleProjectError);
