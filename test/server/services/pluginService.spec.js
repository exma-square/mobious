"use strict";
/**
 * Dependencies
 */
import PluginService from '../../../server/services/pluginService';
import models from '../../../server/models';
import Router from 'koa-router';




describe.only('pluginService', () => {

  it('install plugin', (done) => {

    var router = new Router();

    var pluginService = new PluginService(models.sequelize, router);

    pluginService.installPlugin('mobious_plugin_sample');

    pluginService.getDb().should.be.Object;

    done();
  });


});
