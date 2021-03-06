

exports.index = function *() {

  let users = yield models.User.findAll()

  this.body = {users}
};

exports.get = function *() {

  let userId = this.params.id;

  let user = yield models.User.findById(userId);

  this.body = {user}
};


exports.create = function *() {

  let newUser = this.request.body;

  let result = null;

  try {
    result = yield models.User.create(newUser);
  } catch (e) {
    console.error("create user error", e);
  }

  let user = result;

  this.body = {user}
};


exports.delete = function *() {

  let userId = this.params.id;

  let result = null;

  try {
    let user = yield models.User.findById(userId);
    result = yield user.destroy()
  } catch (e) {
    console.error("delete user error", e);
  }

  this.body = {result}
};


exports.updateActivated = function *() {

  let UserId = services.user.getSessionUser(this).id;

  let editUserId = this.params.id;
  let editActivated = this.request.body.activated;

  let result = null;

  try {
    let user = yield models.User.findById(editUserId);

    //Confirm not myself account
    if(UserId !== user.id){
      user.activated = editActivated;
      result = yield user.save();
    }
    result = user;
  } catch (e) {
    console.error("create user error", e);
  }

  let user = result;

  this.body = {user}
};

exports.resetPasswordByAdmin= function *() {

  let result = false;

  try {

    let authStatus = services.user.getAuthStatus(this);

    //Verify Role is Admin
    if(authStatus.authority ==='admin'){
      let userId = this.params.id;
      let pwd1 = this.request.body.pwd1;
      let pwd2 = this.request.body.pwd2;

      //Check Password
      if(pwd1 === pwd2){
        let user = yield models.User.findById(userId);
        user.password = pwd1;
       yield user.save();
       result = true;
      }

    }

  } catch (e) {
    console.error("reset password error", e);
  }
  this.body = {success:result}
};
