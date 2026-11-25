import { AppError } from './appError.js';

export class ProjectLimitError extends AppError {
  constructor(limit: number) {
    super(409, `You can create up to ${limit} projects.`);
  }
}

export class ProjectNotFoundError extends AppError {
  constructor() {
    super(404, 'Project not found.');
  }
}
