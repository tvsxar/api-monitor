import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import { projectsRouter } from './routes/projects.js';

export const app = express();

app.all('/api/auth/{*path}', toNodeHandler(auth));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/projects', projectsRouter);
