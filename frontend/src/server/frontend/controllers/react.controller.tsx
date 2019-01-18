import * as Express from 'express';
import * as path from 'path';
import { ROOT_PATH } from 'server/utils';

const htmlPath = path.resolve(ROOT_PATH, 'dist/index.html');

export const render: Express.Handler = (req, res) => {
  res.sendFile(htmlPath);
};
