import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';

export const app = express();

app.all('/api/auth/{*path}', toNodeHandler(auth));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});
