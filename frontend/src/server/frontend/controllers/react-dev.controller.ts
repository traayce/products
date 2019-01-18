import * as Express from 'express';
import * as path from 'path';
import { compiler } from 'server/frontend/middleware/devMiddleware';

export const renderDev: Express.Handler = (req, res) => {
  const virtualHtmlPath = path.join((compiler as any).outputPath, 'index.html');

  compiler.outputFileSystem.readFile(virtualHtmlPath, (err: any, result: string) => {
    if (err) {
      return res.send(err);
    }

    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
};
