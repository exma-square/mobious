"use strict";
/**
 * Dependencies
 */

describe("User", () => {

  before((done)=>{
    sinon.stub(services.user, 'isAuthenticated', (app) =>{
      return true;
    });

    sinon.stub(services.user, 'getSessionUser', (app) =>{
      return {id: 4};
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

  it("update user activated", (done) => {

    //Setting is 'admin' authority
    sinon.stub(services.user, 'getAuthStatus', (app) =>{
      return {authority: 'admin'};
    });

    let editUserId = 2;
    let editActivated = {activated: true};

    request.put("/rest/user/activated/" + editUserId)
    .expect(200)
    .send(editActivated)
    .end((error, res) => {
      models.User.find({
        where: {
          id: editUserId
        }
      }).then((updatedUser)=>{
        updatedUser.activated.should.be.equal(editActivated.activated);
        done();
      });
    });


  });


  it.only("reset password by admin", (done) => {

    //Setting is 'admin' authority
    sinon.stub(services.user, 'getAuthStatus', (app) =>{
      return {authority: 'admin'};
    });

    let UserId = 2;
    let editPassword= {pwd1: 'password', pwd2: 'password'};

    request.put("/rest/user/resetPasswordByAdmin/" + UserId)
    .expect(200)
    .send(editPassword)
    .end((error, res) => {
      models.User.find({
        where: {
          id: UserId
        }
      }).then((updatedUser)=>{
        updatedUser.password.should.be.equal(editPassword.pwd1);
        done();
      });
    });

  });

});
