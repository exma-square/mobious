

exports.index = function *() {

  let beans = yield models.Bean.findAll()

  this.body = {beans}
};

exports.get = function *() {

  let beanId = this.params.id;

  let bean = yield models.Bean.findOne(userId);

  this.body = {bean}
};


exports.create = function *() {

  let newBean = this.request.body;

  let result = null;

  try {
    result = yield models.User.create(newBean);
  } catch (e) {
    console.error("create user error", e);
  }

  let bean = result;

  this.body = {bean}
};


exports.delete = function *() {

  let beanId = this.params.id;

  let result = null;

  try {
    let bean = yield models.Bean.findById(beanId);
    result = bean.destroy()
  } catch (e) {
    console.error("delete user error", e);
  }

  this.body = {result}
};
