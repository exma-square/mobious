var models  = require('../models');

exports.index = function *() {

  let users = yield models.User.findAll()

  this.body = {users}
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
