// tslint:disable:no-console
import './config';

import app from './express';
import { isProd } from './utils';

const HOST: string = process.env.HOST;
const PORT: number = JSON.parse(process.env.PORT);
const ENV: string = process.env.NODE_ENV;

app.listen(PORT, (err) => {
  if (err) {
    return console.error('🔥 Failed to start server!', err);
  }

  console.log(`=> ⚡ Express server started on ${HOST}:${PORT}`);
  console.log('Environment:', ENV);
});

if (!isProd) {
  import('./watcher');
}
