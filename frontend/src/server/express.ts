import * as Express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as path from 'path';
import * as Raven from 'raven';
import apiApp from './api';
import frontendApp from './frontend';
import { isProd, ROOT_PATH } from './utils';

const API_PATH = "http://localhost:5000";
const app = Express();

if (isProd && JSON.parse(process.env.IS_SENTRY_SERVER_ENABLED)) {
  Raven.config(process.env.SENTRY_DSN_SERVER).install();
  app.use(Raven.requestHandler());
}

if (!isProd) {
  app.use(logger('dev'));
}

app.use(helmet());

var proxy = require('http-proxy-middleware')
let options = {
  target: API_PATH, 
  changeOrigin: true,
  logLevel: "debug",
  onError: function onError(err, req, res) {
    console.log("Something went wrong with the proxy middleware.", err)
    res.end();
  }
};
var prox = proxy(options);
console.log(prox)
app.use('/api', prox)
app.use('/', frontendApp);

if (isProd && JSON.parse(process.env.IS_SENTRY_SERVER_ENABLED)) {
  app.use(Raven.errorHandler());
}

export default app;
