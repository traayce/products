import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import * as path from 'path';
import { Resolve } from 'webpack';
import { isProd, ROOT } from './utils';

const tsconfig = path.resolve(ROOT, 'tsconfig.json');

const resolve: Resolve = {
  modules: ['node_modules'],
  extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  plugins: [
      new TsConfigPathsPlugin({ tsconfig })
  ]
};

export default resolve;
