import { Entry } from 'webpack';

let entry: Entry;

if (process.env.NODE_ENV === 'production') {
  entry = {
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router-dom',
      'react-helmet',
      'raven-js',
      'axios',
      'react-lazy-import'
    ],
    app: './src/client/index.tsx'
  };
} else {
  entry = {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      './src/client/index.tsx'
    ]
  };
}

export default entry;
