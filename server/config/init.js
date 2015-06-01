'use strict';

import debug from 'debug';
import objectAssign from 'react/lib/Object.assign';

import baseConfig from './all.json';
const env = process.env.NODE_ENV || 'development';

// import PluginService from '../services/pluginService';
var getClientInstallAppPath = (pluginName) => {
  var pluginAppInstallPath = `plugins/${pluginName}`;

  return pluginAppInstallPath;
};



let config;

try {
  config = require(`./${env}.json`);

  var port = config.port || '8080';
  var domain = config.domain || 'localhost';

  config.baseUrl = `http://${domain}:${port}/`;
  config.HOME_PATH = __dirname.replace('/server/config', '');
  global.HOME_PATH = config.HOME_PATH;

  config.APP_HOME = `${config.HOME_PATH}/app/plugins/mobious_plugin_sample`;
  // global.APP_HOME = config.APP_HOME;

  config.APP_CLIENT_HOME = getClientInstallAppPath('mobious_plugin_sample');
  // global.APP_CLIENT_HOME = config.APP_CLIENT_HOME;



  console.log('=== config.APP_HOME ===', config.APP_HOME);
  console.log('=== config.HOME_PATH ===', config.HOME_PATH);
  console.log('=== APP_CLIENT_HOME ===', config.APP_CLIENT_HOME);

}
catch (error) {
  debug('dev')(`No specific configuration for env ${env}`);
}

export default objectAssign(baseConfig, config);
