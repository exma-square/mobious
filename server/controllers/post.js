import parse from 'co-busboy';
import fs from 'fs-extra';
var os = require('os');
var path = require('path');
var foreach = require('generator-foreach')
var co = require('co');

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


  try {
    console.log('=== exports.update ===');
    let postId = this.params.id;
    let editPost = this.request.body;
    let UserId = services.user.getSessionUser(this).id;
    let result = null;

    console.log('=== postId ===', postId);

    let post = yield models.Post.find({
      where: {
        id: postId
      },
      include: [ { model: models.Tag } ]
    });
    
    // Remove Tag

    yield * foreach(post.Tags, function * (tag, index) {
      let state = editPost.tags.indexOf(tag.name);
      if(state === -1){
        // New Post Data not have this tag, Remove Tag.
        yield models.Tag.destroy({
          where:{
            id:tag.id
          }});
        }else {
          // Is exist remove in editTag
          editPost.tags.splice(state,1);
        }
      });

      yield * foreach(editPost.tags, function * (tag) {
        // Create new Tag
        yield models.Tag.create({
          name:tag,
          PostId:post.id
        });
      });

      // Post
      post.title=editPost.title;
      post.content=editPost.content;
      post.img=editPost.img;

      post.UserId = UserId;
      result = yield post.save();

      console.log('update result', result);

      this.body = {result};
    } catch (error) {
      console.log(error.stack);
      this.body = {result, error};
    }


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
      this.body = {success: true, filename: filename}

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
