import type { Request, Response } from 'express';
import { getSessionUserId } from '../middleware/requireSession.js';
import { createEndpoint, deleteEndpoint, listEndpoints, updateEndpoint } from '../services/endpoints.js';

export async function listEndpointsController(req: Request, res: Response) {
  res.json(await listEndpoints(getSessionUserId(res), req.params.projectId as string));
}

export async function createEndpointController(req: Request, res: Response) {
  const endpoint = await createEndpoint(getSessionUserId(res), req.params.projectId as string, req.body);
  res.status(201).json(endpoint);
}

export async function updateEndpointController(req: Request, res: Response) {
  const { projectId, endpointId } = req.params;
  const endpoint = await updateEndpoint(getSessionUserId(res), projectId as string, endpointId as string, req.body);
  res.json(endpoint);
}

export async function deleteEndpointController(req: Request, res: Response) {
  const { projectId, endpointId } = req.params;
  await deleteEndpoint(getSessionUserId(res), projectId as string, endpointId as string);
  res.status(204).end();
}
