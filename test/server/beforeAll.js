global.should = require("should");
global.request = require("supertest");
global.app = null;

var liftApp = require("../../server");

before(async (done) => {

  let app = await liftApp()
  global.app = app
  global.request = global.request.agent(app.listen());
  done();

});
