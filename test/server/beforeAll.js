global.should = require("should");
global.request = require("supertest");
global.app = null;

var liftApp = require("../../server");

before(function(done){
  liftApp(function (appInstance){
    global.app = appInstance;
    global.request = global.request.agent(app.listen());
    done();
  });
});
