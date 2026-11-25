import { AppError } from '../errors/appError.js';
import { ProjectLimitError, ProjectNotFoundError } from '../errors/projectErrors.js';
import {
  createProjectWithinLimit,
  findProjectsByOwner,
  updateProjectByOwner,
} from '../repositories/projects.js';
import type { ProjectData } from '../types/project.js';

const maxProjects = Number(process.env.MAX_PROJECTS_PER_USER ?? 5);

if (!Number.isSafeInteger(maxProjects) || maxProjects < 1) {
  throw new Error('MAX_PROJECTS_PER_USER must be a positive integer');
}

export function listProjects(ownerId: string) {
  return findProjectsByOwner(ownerId);
}

export async function createProject(ownerId: string, data: ProjectData) {
  const result = await createProjectWithinLimit(ownerId, data, maxProjects);
  if (result.outcome === 'ownerNotFound') throw new AppError(401, 'Authentication required');
  if (result.outcome === 'limitReached') throw new ProjectLimitError(maxProjects);

  return result.project;
}

export async function updateProject(ownerId: string, id: string, data: ProjectData) {
  const project = await updateProjectByOwner(ownerId, id, data);
  if (!project) {
    throw new ProjectNotFoundError();
  }
  return project;
}
