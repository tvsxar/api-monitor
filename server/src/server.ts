import { app } from './app.js';

const port = 3000;

app.listen(port, '127.0.0.1', () => {
  console.log(`PulseKit API listening at http://127.0.0.1:${port}`);
});
