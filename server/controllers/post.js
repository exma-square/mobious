exports.index = function *() {

  let posts = yield models.Post.findAll()

  this.body = {posts}
};

exports.get = function *() {

  let postId = this.params.id;
  let post = yield models.Post.find({
    where: {
      id: postId
    },
    include: [ { model: models.Tag ,attributes: ['name']} ]
  });

  this.body = {post}
};


exports.create = function *() {

  let newPost = this.request.body;

  let result = null;

  try {
    result = yield models.Post.create(newPost);
  } catch (e) {
    console.error("create post error", e);
  }

  let post = result;

  this.body = {post}
};

exports.update = function *() {

  let editPost = this.request.body;

  let UserId = services.user.getAuthStatus(this).sessionUser.id;

  let result = null;

  try {
    let post = yield models.Post.findById(editPost.id);
    post.title=editPost.title;
    post.content=editPost.content;
    post.UserId = UserId;
    result = yield post.save();
  } catch (e) {
    console.error("delete post error", e);
  }
  this.body = {result}
};


exports.delete = function *() {

  let postId = this.params.id;

  let result = null;

  try {
    let post = yield models.Post.findById(postId);
    result = post.destroy()
  } catch (e) {
    console.error("delete post error", e);
  }

  this.body = {result}
};
