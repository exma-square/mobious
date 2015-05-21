"use strict";
/**
 * Dependencies
 */
import PluginService from '../../../server/services/pluginService';
import models from '../../../server/models';

describe.only('pluginService', () => {

  it('install plugin', (done) => {

    var pluginService = new PluginService(models.sequelize);

    pluginService.installPlugin('mobious_plugin_sample');

    pluginService.getDb().should.be.Object;

    done();
  });


});
