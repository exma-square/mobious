var models  = require('../models');

exports.index = function *() {

  let users = yield models.User.findAll()

  this.body = {users: users}
};
