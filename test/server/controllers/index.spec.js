"use strict";

describe("Index", function () {


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
      console.log("res.body.user.id", res.body.user.id);
      res.body.user.id.should.greaterThan(0);

      done(error);

    });
  });
});
