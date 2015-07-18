var chai = require('chai');
chai.should();

global.request = require("supertest");
global.sinon = require("sinon");
global.app = null;

var liftApp = require("../../server");

before(async (done) => {

  let app = await liftApp();
  global.app = app;
  global.request = global.request.agent(app.listen());

  console.log("server start finish.");

  done();

});
