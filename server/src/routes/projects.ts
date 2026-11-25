import express from 'express';
import {
  createProjectController,
  listProjectsController,
  updateProjectController,
} from '../controllers/projects.js';
import { handleProjectError } from '../middleware/handleProjectError.js';
import { requireSession } from '../middleware/requireSession.js';

export const projectsRouter = express.Router();

projectsRouter.use(requireSession, express.json({ limit: '8kb' }));
projectsRouter.get('/', listProjectsController);
projectsRouter.post('/', createProjectController);
projectsRouter.put('/:projectId', updateProjectController);
projectsRouter.use(handleProjectError);
