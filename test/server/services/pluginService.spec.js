"use strict";
/**
 * Dependencies
 */
import PluginService from '../../../server/services/pluginService';
import models from '../../../server/models';
import Router from 'koa-router';




describe.skip('pluginService', () => {

  it('install database and rest of plugin', (done) => {

    var router = new Router();

    var pluginService = new PluginService(models.sequelize, router);

    pluginService.installPlugin('mobious_plugin_sample');

    pluginService.getDb().should.be.Object;

    done();
  });



  it('install app of plugin', async (done) => {

    await PluginService.installApp('mobious_plugin_sample');

    done();

  });



});
