import * as Express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../../../webpack/webpack.config';

export const compiler = webpack(webpackConfig);

const devMiddleware = (app: Express.Application) => {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: (webpackConfig.output as any).publicPath as string,
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }
  }));
  app.use(webpackHotMiddleware(compiler));
};

export default devMiddleware;
