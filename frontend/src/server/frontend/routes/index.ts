import * as Express from 'express';
import { render } from 'server/frontend/controllers/react.controller';

const router = Express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('Frontend Health: OKs 👌'));

/** * /* - Render React webapp */
if (process.env.NODE_ENV === 'production') {
  router.use('*', render);
} else {
 import('server/frontend/controllers/react-dev.controller')
  .then(({ renderDev }) => {
    router.use('*', renderDev);
  })
  .catch(err => { throw new Error('Failed to load react dev controller'); });
}

export default router;
