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

exports.update = async function() {
  console.log('=============');

  let editPost = this.request.body;
  let UserId = services.user.getAuthStatus(this).sessionUser.id;
  // let UserId = 1;
  let result = null;

  try {


    let post = await models.Post.find({
      where: {
        id: editPost.id
      },
      include: [ { model: models.Tag } ]
    });

    // Remove Tag
    post.Tags.forEach((tag,index) =>  {
      let state = editPost.tags.indexOf(tag.name);
      if(state === -1){
        // New Post Data not have this tag, Remove Tag.
        models.Tag.destroy({
          where:{
            id:tag.id
          }});
      }else {
        // Is exist remove in editTag
        editPost.tags.splice(state,1);
      }
    });

    // Create Tag
    editPost.tags.forEach(tag =>{
      // Create new Tag
      models.Tag.create({
        name:tag,
        PostId:post.id
      });
    });

    // Post
    post.title=editPost.title;
    post.content=editPost.content;
    post.UserId = UserId;
    result = await post.save();
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
