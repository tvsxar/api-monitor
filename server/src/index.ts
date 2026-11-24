import express from 'express';

const app = express();
const port = 3000;

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`PulseKit API listening at http://127.0.0.1:${port}`);
});
