"use strict";
/**
 * Dependencies
 */

describe("User", function () {


  it("create user", function (done) {

    // {
    //   "gender":"female",
    //   "name":{"title":"ms","first":"clara","last":"coleman"},
    //   "location":{"street":"7855 valwood pkwy","city":"evansville","state":"delaware","zip":"38095"},
    //   "email":"clara.coleman83@example.com",
    //   "username":"smallsnake436",
    //   "password":"total",
    //   "salt":"ROOujBwn",
    //   "md5":"3719d92a9a409bb329538929cd1b3549",
    //   "sha1":"81f58d15787d3e0a63685facfa139399f05f947c",
    //   "sha256":"0687fe39adb0e43c28c8ffb70e84baa2ea2e1bae0afa349db31b4e861208ec8e",
    //   "registered":"1238304997",
    //   "dob":"56822726",
    //   "phone":"(951)-385-6121",
    //   "cell":"(657)-919-3511",
    //   "SSN":"214-92-8644",
    //   "picture":{
    //     "large":"http://api.randomuser.me/portraits/women/72.jpg",
    //     "medium":"http://api.randomuser.me/portraits/med/women/72.jpg",
    //     "thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"
    //   }
    // }

    // request.get("/rest")
    // .expect(200)
    // .end(function (error, res) {
    //
    //   res.body.test.should.be.equal('test');
    //
    //   done(error);
    //
    // });

    done();
  });

  it("index all user", function (done) {
    // {"users":
    //   [
    //     {
    //       "user":{
    //         "gender":"female",
    //         "name":{"title":"ms","first":"clara","last":"coleman"},
    //         "location":{"street":"7855 valwood pkwy","city":"evansville","state":"delaware","zip":"38095"},
    //         "email":"clara.coleman83@example.com",
    //         "username":"smallsnake436",
    //         "password":"total",
    //         "salt":"ROOujBwn",
    //         "md5":"3719d92a9a409bb329538929cd1b3549",
    //         "sha1":"81f58d15787d3e0a63685facfa139399f05f947c",
    //         "sha256":"0687fe39adb0e43c28c8ffb70e84baa2ea2e1bae0afa349db31b4e861208ec8e",
    //         "registered":"1238304997",
    //         "dob":"56822726",
    //         "phone":"(951)-385-6121",
    //         "cell":"(657)-919-3511",
    //         "SSN":"214-92-8644",
    //         "picture":{
    //           "large":"http://api.randomuser.me/portraits/women/72.jpg",
    //           "medium":"http://api.randomuser.me/portraits/med/women/72.jpg",
    //           "thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"
    //         },
    //         "version":"0.5",
    //         "nationality":"US"
    //       },
    //       "seed":"7729a1ef4ba6ef68"
    //     }
    //   ]
    // }

    done();

  });


});
