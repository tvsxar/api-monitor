import { ProjectLimitError, ProjectNotFoundError } from '../errors/projectErrors.js';
import {
  findProjectsByOwner,
  updateProjectByOwner,
  withProjectCreationTransaction,
  type ProjectData,
} from '../repositories/projects.js';

const maxProjects = Number(process.env.MAX_PROJECTS_PER_USER ?? 5);

if (!Number.isSafeInteger(maxProjects) || maxProjects < 1) {
  throw new Error('MAX_PROJECTS_PER_USER must be a positive integer');
}

export function listProjects(ownerId: string) {
  return findProjectsByOwner(ownerId);
}

export function createProject(ownerId: string, data: ProjectData) {
  return withProjectCreationTransaction(ownerId, async ({ countProjects, insertProject }) => {
    const count = await countProjects();
    if (count >= maxProjects) {
      throw new ProjectLimitError(maxProjects);
    }
    return insertProject(data);
  });
}

export async function updateProject(ownerId: string, id: string, data: ProjectData) {
  const project = await updateProjectByOwner(ownerId, id, data);
  if (!project) {
    throw new ProjectNotFoundError();
  }
  return project;
}
