'use strict';

import debug from 'debug';
import objectAssign from 'react/lib/Object.assign';

import baseConfig from './all.json';
const env = process.env.NODE_ENV || 'development';
let config;

try {
  config = require(`./${env}.json`);

  var port = config.port || '8080';
  var domain = config.domain || 'localhost';

  config.baseUrl = `http://${domain}:${port}/`;

}
catch (error) {
  debug('dev')(`No specific configuration for env ${env}`);
}

export default objectAssign(baseConfig, config);
