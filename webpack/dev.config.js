import webpack from 'webpack';
import {isArray} from 'lodash';

import baseConfig from './base.config';
import startKoa from './utils/start-koa';

const LOCAL_IP = require('dev-ip')();

const PROTOCOL = (process.env.C9_HOSTNAME) ? 'https' : 'http';
const HOST = process.env.C9_HOSTNAME || isArray(LOCAL_IP) && LOCAL_IP[0] || LOCAL_IP || 'localhost';
const PORT = (process.env.C9_HOSTNAME) ? '443' : parseInt(process.env.PORT, 10) + 1 || 3001;
const PUBLIC_PATH = `${PROTOCOL}://${HOST}:${PORT}/assets/`;

const config = Object.assign({}, baseConfig, {
  devtool: 'eval-source-map',
  entry: {
    app: [
      `webpack-dev-server/client?http://localhost:${PORT}`,
      'webpack/hot/only-dev-server',
      './app/index.js'
    ]
  },
  output: Object.assign(
    baseConfig.output,
    {publicPath: PUBLIC_PATH}
  )
});

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/,
    loader: 'file?name=[sha512:hash:base64:7].[ext]'
  },
  {
    test: /\.scss|.css$/,
    loader: 'style!css?sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
  }
]);

// add `react-hot` on JS files
delete config.module.loaders[1].loader;
config.module.loaders[1].loaders = ['react-hot', 'babel'];

config.plugins = [
  // hot reload
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),

  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify('development')
    }
  }),

  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin()
].concat(config.plugins).concat([
  function() {
    this.plugin('done', startKoa);
  }
]);

export default {
  server: {
    port: PORT,
    options: {
      publicPath: (process.env.C9_HOSTNAME) ? '/' : PUBLIC_PATH,
      hot: true,
      stats: {
        assets: true,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false
      }
    }
  },
  webpack: config
};
