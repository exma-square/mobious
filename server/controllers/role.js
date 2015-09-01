exports.get = function *() {

  let attribute = this.params.attribute;

  let attributes = yield models.User.findAll({
    attributes:['id','username'],
    include: [ { model: models.Role, where:{authority:attribute}} ]
  });

  this.body = {attributes}
};


exports.create = function *() {
  let newRole = this.request.body;

  let result = null;

  try {
    result = yield models.Role.create(newRole);
  } catch (e) {
    console.error("create user error", e);
  }

  let role = result;

  this.body = {role}
};
