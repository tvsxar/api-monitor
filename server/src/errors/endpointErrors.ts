import { AppError } from './appError.js';

export class EndpointLimitError extends AppError {
  constructor(limit: number) {
    super(409, `You can create up to ${limit} endpoints per project.`);
  }
}

export class EndpointNotFoundError extends AppError {
  constructor() {
    super(404, 'Endpoint not found.');
  }
}
