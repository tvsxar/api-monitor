import { Router } from 'express';
import {
  createEndpointController,
  deleteEndpointController,
  listEndpointsController,
  updateEndpointController,
} from '../controllers/endpoints.js';
import { validateEndpointBody, validateEndpointParams } from '../middleware/validateEndpoint.js';
import { validateProjectParams } from '../middleware/validateProject.js';

export const endpointsRouter = Router({ mergeParams: true });

endpointsRouter.get('/', validateProjectParams, listEndpointsController);
endpointsRouter.post('/', validateProjectParams, validateEndpointBody, createEndpointController);
endpointsRouter.put('/:endpointId', validateEndpointParams, validateEndpointBody, updateEndpointController);
endpointsRouter.delete('/:endpointId', validateEndpointParams, deleteEndpointController);
