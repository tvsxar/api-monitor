import { EndpointLimitError, EndpointNotFoundError } from '../errors/endpointErrors.js';
import { ProjectNotFoundError } from '../errors/projectErrors.js';
import * as endpointsRepository from '../repositories/endpoints.js';
import type { EndpointSettings } from '../types/endpoint.js';

const maxEndpointsPerProject = 5;

export async function listEndpoints(ownerId: string, projectId: string) {
  const project = await endpointsRepository.findProjectByOwner(ownerId, projectId);
  if (!project) throw new ProjectNotFoundError();

  return endpointsRepository.findEndpointsByProject(projectId);
}

export async function createEndpoint(ownerId: string, projectId: string, data: EndpointSettings) {
  const result = await endpointsRepository.createEndpointWithinLimit(ownerId, projectId, data, maxEndpointsPerProject);
  if (result.outcome === 'projectNotFound') throw new ProjectNotFoundError();
  if (result.outcome === 'limitReached') throw new EndpointLimitError(maxEndpointsPerProject);

  return result.endpoint;
}

export async function updateEndpoint(ownerId: string, projectId: string, endpointId: string, data: EndpointSettings) {
  const endpoint = await endpointsRepository.updateEndpoint(ownerId, projectId, endpointId, data);
  if (!endpoint) throw new EndpointNotFoundError();

  return endpoint;
}

export async function deleteEndpoint(ownerId: string, projectId: string, endpointId: string) {
  const deleted = await endpointsRepository.deleteEndpoint(ownerId, projectId, endpointId);
  if (!deleted) throw new EndpointNotFoundError();
}
