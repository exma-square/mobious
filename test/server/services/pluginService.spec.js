"use strict";
/**
 * Dependencies
 */
import PluginService from '../../../server/services/pluginService';
import models from '../../../server/models';
import Router from 'koa-router';




describe('pluginService', () => {

  it('install database and rest of plugin', (done) => {

    var router = new Router();

    var pluginService = new PluginService(models.sequelize, router);

    pluginService.installPlugin('mobious_plugin_sample');

    pluginService.getDb().should.be.Object;

    done();
  });

  it.only('get install app path of plugin', (done) => {

    var path = PluginService.getInstallAppPath('mobious_plugin_sample');

    done();

  });


  it.only('install app of plugin', async (done) => {

    await PluginService.installApp('mobious_plugin_sample');

    done();

  });



});
