"use strict";
/**
 * Dependencies
 */

var should = require("should");
var liftApp = require("../../../server");
var request = require("supertest");
var app = null;

describe("Index", function () {

  before(function (done) {
    liftApp(function (appInstance){
      app = appInstance;
      request = request.agent(app.listen());
      done();
    });
  });



  it("should get test message", function (done) {
    request.get("/rest")
    .expect(200)
    .end(function (error, res) {

      res.body.test.should.be.equal('test');

      done(error);

    });
  });

  it("should get test data", function (done) {
    request.get("/rest/testData")
    .expect(200)
    .end(function (error, res) {

      res.body.test.should.be.equal('test');

      done(error);

    });
  });
});
