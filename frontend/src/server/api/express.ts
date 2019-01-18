import * as bodyParser from 'body-parser';
import * as Express from 'express';
import routes from './routes';

const app = Express();

app.use(bodyParser.json());

app.use('/v1', routes);

export default app;
