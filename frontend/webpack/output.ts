import * as path from 'path';
import { Output } from 'webpack';
import { isProd, ROOT } from './utils';

let output: Output;

if (isProd) {
  output = {
    path: path.resolve(ROOT, 'dist'),
    filename: '[name]__[chunkhash].js',
    chunkFilename: '[id]_[name]__[chunkhash].js',
    publicPath: '/'
  };
} else {
  output = {
    path: path.resolve(ROOT, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id]_[name].js',
    publicPath: '/'
  };
}

export default output;
