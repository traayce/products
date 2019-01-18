import * as Express from 'express';

const router = Express.Router();

router.get('/health-check', (req, res) => res.send('API Health: OK 👌'));

export default router;
