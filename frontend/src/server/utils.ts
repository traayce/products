import * as path from 'path';

export const ROOT_PATH = path.resolve(__dirname, '../../');

export const isProd = process.env.NODE_ENV === 'production';

export const getBundlePath = (): string => {
  if (process.env.NODE_ENV === 'production') {
    try {
      return require('../../../webpack-assets.json').main.js;
    } catch (err) {
      throw new Error('webpack-assets.json not found. This means the project was probably not built.');
    }
  } else {
    const webpackConfig = require('../../../webpack.config').default;

    return (webpackConfig.output as any).publicPath + (webpackConfig.output as any).filename;
  }
};
