exports.get = function *() {

  let attribute = this.params.attribute;

  let attributes = yield models.User.findAll({
    attributes:['id','username'],
    include: [ { model: models.Role, where:{authority:attribute}} ]
  });

  this.body = {attributes}
};
