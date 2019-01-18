import * as dotenv from 'dotenv';

dotenv.config();

import * as webpack from 'webpack';
import entry from './entry';
import module from './module';
import output from './output';
import plugins from './plugins';
import resolve from './resolve';
import { isProd, ROOT } from './utils';

const config: webpack.Configuration = {
  context: ROOT,
  entry,
  output,
  module,
  plugins,
  resolve,
  target: 'web',
  devtool: isProd
    ? 'hidden-source-map'
    : 'cheap-module-eval-source-map'
};

export default config;
