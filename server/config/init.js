import debug from 'debug';
import objectAssign from 'react/lib/Object.assign';

import baseConfig from './all.json';
const env = process.env.NODE_ENV || 'development';
let config;

try {
  config = require(`./${env}`);

  let port = parseInt(config.port, 10) + 2 || '8080';
  let domain = config.domain || 'localhost';

  config.baseUrl = `http://${domain}:${port}/`;
}
catch (error) {
  debug('dev')(`No specific configuration for env ${env}`);
}

export default objectAssign(baseConfig, config);
