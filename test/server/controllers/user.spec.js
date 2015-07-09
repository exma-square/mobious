"use strict";
/**
 * Dependencies
 */

describe("User", () => {

  before((done)=>{
    sinon.stub(services.user, 'isAuthenticated', (app) =>{
      return true;
    });
    done();
  });

  after((done) =>{
    services.user.isAuthenticated.restore();
    done();
  });

  it("index all user", (done) => {

    request.get("/rest/user/")
    .expect(200)
    .end((error, res) => {
      console.log("res.body.users", res.body.users);

      res.body.users.should.be.Array;
      res.body.users[0].id.should.greaterThan(0);

      done(error);
    });

  });


  describe("create and delete", () => {

    let createdUser = null;

    console.log("app.isAuthenticated()", global.app);

    it("create user", (done) => {

      let picture = {
        "large":"http://api.randomuser.me/portraits/women/72.jpg",
        "medium":"http://api.randomuser.me/portraits/med/women/72.jpg",
        "thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"
      }

      let newUserParams = {
        "username":"testuser",
        "password":"testuser",
        "gender":"male",
        "email":"testuser@testuser.com",
        "phone":"(951)-385-6121",
        "cell":"(657)-919-3511",
        "picture":JSON.stringify(picture)
      }


      request.post("/rest/user")
      .send(newUserParams)
      .expect(200)
      .end((error, res) => {
        console.log("res.body.user", res.body.user);

        res.body.user.should.be.Object;
        res.body.user.id.should.greaterThan(0);
        res.body.user.username.should.equal(newUserParams.username);

        createdUser = res.body.user;

        done(error);
      });

    });

    it("delete user", (done) => {

      request.delete("/rest/user/"+ createdUser.id)
      .expect(200)
      .end((error, res) => {

        models.User.findById(createdUser.id).then((result) =>{
          (result == null).should.true
          done(error);
        });

      });

    });

  });

});
