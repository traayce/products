import * as AssetsPlugin from 'assets-webpack-plugin';
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as OfflinePlugin from 'offline-plugin/lib/index';
import * as path from 'path';
import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { isProd, ROOT } from './utils';

let plugins: any[];

if (isProd) {
  plugins = [
    new webpack.DefinePlugin({
      /**
       * Needed in order to use minified version of React
       */
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__PROD__': JSON.stringify(true),
      '__DEVTOOLS__': JSON.stringify(process.env.IS_REDUX_DEVTOOLS_ENABLED === 'true'),
      '__CLIENT__': JSON.stringify(true),
      '__IS_SENTRY_CLIENT_ENABLED__': JSON.stringify(process.env.IS_SENTRY_CLIENT_ENABLED === 'true'),
      '__SENTRY_CLIENT_DSN__': JSON.stringify(process.env.SENTRY_DSN_CLIENT)
    }),
    new AssetsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor__[chunkhash].js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin('styles__[hash].css'),
    new HtmlWebpackPlugin({
      template: './src/client/index.ejs',
      minify: {
        collapseWhitespace: true
      }
    }),
    new OfflinePlugin({
      caches: 'all',
      responseStrategy: 'cache-first',
      updateStrategy: 'changed'
    })
  ];
} else {
  plugins = [
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
      __DEVTOOLS__: JSON.stringify(process.env.IS_REDUX_DEVTOOLS_ENABLED === 'true'),
      __CLIENT__: JSON.stringify(true),
      __IS_SENTRY_CLIENT_ENABLED__: JSON.stringify(process.env.IS_SENTRY_CLIENT_ENABLED === 'true'),
      __SENTRY_CLIENT_DSN__: JSON.stringify(process.env.SENTRY_DSN_CLIENT)
    }),
    new AssetsPlugin(),
    new CheckerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './src/client/index.ejs'
    })
    // new OfflinePlugin({
    //   caches: 'all',
    //   responseStrategy: 'cache-first',
    //   updateStrategy: 'changed'
    // })
  ];
}

if (JSON.parse(process.env.IS_WEBPACK_STATS_ENABLED)) {
  plugins.push(
    new BundleAnalyzerPlugin()
  );
}

export default plugins;
