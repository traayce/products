import * as Express from 'express';
import * as path from 'path';
import { isProd, ROOT_PATH } from '../utils';
import routes from './routes';

const app = Express();

if (!isProd) {
  require('./middleware/devMiddleware').default(app);
}

app.use(Express.static(path.resolve(ROOT_PATH, 'wwwroot')));
app.use(Express.static(path.resolve(ROOT_PATH, 'dist')));
app.use(routes);

export default app;
