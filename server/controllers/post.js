import parse from 'co-busboy';
import fs from 'fs-extra';
var os = require('os');
var path = require('path');
exports.index = function *() {

  let posts = yield models.Post.findAll()

  this.body = {posts}
};

exports.get = function *() {

  let postId = this.params.id;

  let post = yield models.Post.findById(postId);

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
    post.img=editPost.img;
    post.UserId = UserId;
    result = yield post.save();
  } catch (e) {
    console.error("update post error", e);
  }
  this.body = {result}
};


exports.upload = function* (next) {

  // ignore non-POSTs
  if ('POST' != this.method) return yield next;

  try {
    // multipart upload
    let parts = parse(this, {
      autoFields: true
    });
    let part;
    let dir = '.tmp/images/post/';
    fs.ensureDirSync(dir);
    let filename = Math.floor(Math.random()*1000000) + '.png';

    while (part = yield parts) {
      var stream = fs.createWriteStream(path.join(dir, filename));
      part.pipe(stream);
    }
    console.log('uploading %s -> %s', filename, stream.path);
    this.body = {success: true, path: filename}

  } catch (e) {

    console.log(e.stack);
    this.body = {success: false};

  }
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
