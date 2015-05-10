"use strict";
/**
 * Dependencies
 */

var should = require("should");
var app = require("../../../server");
var request = require("supertest").agent(app.listen());


describe("Index", function () {
  it("should render the page", function (done) {
    request.get("/rest")
    .expect(200)
    .end(function (error, res) {

      res.body.test.should.be.equal('test');

      done(error);

    });
  });
});
