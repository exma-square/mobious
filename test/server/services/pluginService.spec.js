"use strict";
/**
 * Dependencies
 */
var pluginService = require("../../../server/services/pluginService");

describe.only("pluginService", () => {

  it('install plugin', (done) => {

    pluginService.installModels();

    done();

  });


});
