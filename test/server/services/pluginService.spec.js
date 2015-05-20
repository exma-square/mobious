"use strict";
/**
 * Dependencies
 */
import PluginService from '../../../server/services/pluginService';
import models from '../../../server/models';

import {connection} from '../../../server/config/init';
import Sequelize from 'sequelize';

describe.only('pluginService', () => {

  it('install plugin', (done) => {

    var pluginService = new PluginService(models.sequelize);

    pluginService.addPlugin('mobious_plugin_sample');

    pluginService.mountModels();

    done();
  });


});
