"use strict";
/**
 * Dependencies
 */

describe("User", function () {

  it("index all user", function (done) {

    request.get("/rest/user/")
    .expect(200)
    .end(function (error, res) {
      console.log("res.body.users", res.body.users);

      res.body.users.should.be.Array;
      res.body.users[0].id.should.greaterThan(0);

      done(error);
    });

  });


});
