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
  let post = yield models.Post.find({
    where: {
      id: postId
    },
    include: [ { model: models.Tag ,attributes: ['name']} ]
  });

  this.body = {post}
};


exports.create = function *() {

  console.log('inside create api');
  try {
   let tmpPost = this.request.body;
   let post = null;
   let tag_arr = [];
   let tmpTag = [];

   let result = models.Post.create({
       title: tmpPost.title,
       content: tmpPost.content,
       img: tmpPost.img
   });

   tmpPost.tags.forEach((tag) => {
     tmpTag.push({
         name: tag,
         PostId: result.id
       });
   });

   let tagResult = yield models.Tag.bulkCreate(tmpTag);
   tagResult.forEach((tr) => {
     console.log('tr name', tr.name);
     tag_arr.push(tr.name);
   });
   post = yield result;
   post.setDataValue('tags', yield tag_arr);

   this.body = {post};

  } catch (error) {
    console.log(error.stack);
    this.body = {post, error};
  }
};

exports.update = function *() {


  try {
    let postId = this.params.id;
    let editPost = this.request.body;
    let UserId = services.user.getSessionUser(this).id;
    let result = null;

    let post = yield models.Post.find({
      where: {
        id: postId
      },
      include: [ { model: models.Tag } ]
    });
    if( UserId === post.CreatorId || UserId === post.EditorId )
    {
      // Remove Tag

      // yield * foreach(post.Tags, function * (tag, index) {

      yield post.Tags.map((tag) => {
        let state = editPost.tags.indexOf(tag.name);
        if(state === -1){
          // New Post Data not have this tag, Remove Tag.
          models.Tag.destroy({
            where:{
              id:tag.id
            }
          });
        }else {
          // Is exist remove in editTag
          editPost.tags.splice(state,1);
        }
      });

      yield editPost.tags.map((tag) => {
        // Create new Tag
        models.Tag.create({
          name:tag,
          PostId:post.id
        });
      });

      // Post
      post.title=editPost.title;
      post.content=editPost.content;
      post.img=editPost.img;

      result = yield post.save();

      this.body = {result};
    }

  } catch (error) {
    console.log(error.stack);
    this.body = {result, error};
  }


};

exports.updateEditor = function *() {

    try {
      let authStatus = services.user.getAuthStatus(this);
      if(authStatus.authority ==='admin'){
        let postId = this.params.id;
        let editorId = this.request.body.editorId;
        let result = null;

        if(editorId==='0'){
          editorId=null;
        };

        let post = yield models.Post.findById(postId);
        post.EditorId = editorId;
        yield post.save();

        this.body = {post};
      }
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
    let UserId = services.user.getSessionUser(this).id;
    let post = yield models.Post.findById(postId);

    if( UserId === post.CreatorId || UserId === post.EditorId )
      result = yield post.destroy()

  } catch (e) {
    console.error("delete post error", e);
  }

  this.body = {result}
};
