import { z } from 'zod';
import { projectParams } from './projects.js';

export const endpointParams = projectParams.extend({
  endpointId: z.uuid('Invalid endpoint ID.'),
});

export const endpointInput = z.strictObject({
  name: z.string().trim()
    .min(1, 'Endpoint name is required.')
    .max(100, 'Use at most 100 characters for the endpoint name.')
    .refine((name) => !name.includes('\0'), 'Endpoint name contains an invalid character.'),
  path: z.string()
    .max(2048, 'Use at most 2048 characters for the endpoint path.')
    .regex(/^\/(?!\/)[^\s\\#\x00-\x1f\x7f]*$/, 'Enter a path on the project host, such as /api/health.'),
  intervalSeconds: z.number().int().min(60).max(2147483647).optional(),
  timeoutMs: z.number().int().min(1).max(30000).optional(),
  expectedStatus: z.number().int().min(100).max(599).optional(),
});
