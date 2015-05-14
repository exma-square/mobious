global.should = require("should");
global.request = require("supertest");
global.app = null;

var liftApp = require("../../server");

before((done) => {

  liftApp((appInstance) => {
    global.app = appInstance;
    global.request = global.request.agent(app.listen());
    done();
  });
});
