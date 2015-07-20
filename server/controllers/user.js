

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
