var models  = require('../models');

exports.index = function *() {
  this.body = {test: "test"}
};

exports.testData = function *() {
  var userCreateResult = yield models.User.create({username: 'spooky'});
  this.body = {user: userCreateResult.dataValues};
};
