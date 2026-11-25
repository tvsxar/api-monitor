import type { Request, Response } from 'express';
import { getSessionUserId } from '../middleware/requireSession.js';
import { createProject, listProjects, updateProject } from '../services/projects.js';

export async function listProjectsController(_req: Request, res: Response) {
  res.json(await listProjects(getSessionUserId(res)));
}

export async function createProjectController(req: Request, res: Response) {
  const project = await createProject(getSessionUserId(res), req.body);
  res.status(201).json(project);
}

export async function updateProjectController(req: Request, res: Response) {
  const project = await updateProject(getSessionUserId(res), req.params.projectId as string, req.body);
  res.json(project);
}
