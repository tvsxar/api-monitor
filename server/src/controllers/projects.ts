import type { Request, Response } from 'express';
import type { SessionLocals } from '../middleware/requireSession.js';
import { createProject, listProjects, updateProject } from '../services/projects.js';
import { projectInput } from '../validation/projects.js';

export async function listProjectsController(_req: Request, res: Response<unknown, SessionLocals>) {
  res.json(await listProjects(res.locals.session.user.id));
}

export async function createProjectController(req: Request, res: Response<unknown, SessionLocals>) {
  const input = projectInput.safeParse(req.body);
  if (!input.success) {
    res.status(400).json({ message: input.error.issues[0].message });
    return;
  }

  const project = await createProject(res.locals.session.user.id, input.data);
  res.status(201).json(project);
}

export async function updateProjectController(
  req: Request<{ projectId: string }>,
  res: Response<unknown, SessionLocals>,
) {
  const input = projectInput.safeParse(req.body);
  if (!input.success) {
    res.status(400).json({ message: input.error.issues[0].message });
    return;
  }

  const project = await updateProject(res.locals.session.user.id, req.params.projectId, input.data);
  res.json(project);
}
