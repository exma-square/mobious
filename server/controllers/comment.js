

exports.index = function *() {

  let comments = yield models.Comment.findAll();

  this.body = {comments}
};

exports.get = function *() {

  let commentId = this.params.id;

  let comment = yield models.Comment.findById(commentId);

  this.body = {comment}
};


exports.create = function *() {

  let newComment = this.request.body;

  let result = null;

  try {
    result = yield models.Comment.create(newComment);
  } catch (e) {
    console.error("create comment error", e);
  }

  let comment = result;

  this.body = {comment}
};


exports.delete = function *() {

  let commentId = this.params.id;

  let result = null;

  try {
    let comment = yield models.Comment.findById(commentId);
    result = comment.destroy()
  } catch (e) {
    console.error("delete comment error", e);
  }

  this.body = {result}
};
