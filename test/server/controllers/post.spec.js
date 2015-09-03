import fs from "fs";

describe("post", () => {
  before((done)=>{
    sinon.stub(services.user, 'isAuthenticated', (app) =>{
      return true;
    });

    sinon.stub(services.user, 'getSessionUser', (app) =>{
      return {id: 2};
    });
    done();
  });

  after((done) =>{
    services.user.isAuthenticated.restore();
    done();
  });


  describe('find one and all', (done) => {


    it("index all post", (done) => {

      request.get("/rest/post/")
      .expect(200)
      .end((error, res) => {
        let posts = res.body.posts;

        posts.should.be.Array;
        posts[0].id.should.greaterThan(0);

        done(error);
      });

    });

    it("find single post", (done) => {

      request.get("/rest/post/1")
      .expect(200)
      .end((error, res) => {

        models.User.findById('1').then((result) =>{
          (result !== null).should.true
          done(error);
        });
      });
    });
  });

  describe('create a post', () => {
    it('create', async (done) => {

      let seedPost = {
        title: 'createPostTitle',
        content: 'createPostContent',
        tags: ['tag1', 'tag2', 'tag3'],
        img: 'createPostImgDir'
      };

      let createResult = await new Promise((resolve, reject) => {
        request.post('/rest/post/')
        .send(seedPost)
        .expect(200)
        .end((error, res) => {
          if (error) return reject(error);
          return resolve(res.body.post);
        });
      });

      let result = await createResult;
      console.log('spec returns result ', result);
      try {
        result.title.should.equal(seedPost.title);
        result.tags.should.eql(seedPost.tags);
        result.id.should.be.greaterThan(0);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('find one and all', (done) => {
    it("file Upload", (done) => {
      request.post('/rest/post/fileUpload/')
      .attach('file', 'test/server/resources/mobious.png')
      .expect(200)
      .end(function(err, res) {
        done(err)
      });
    });
  });

  it("update post", (done) => {
    let updatePost = {
      title: '111',
      content: 'ssss',
      tags: ['aa', 'bb']
    }
    request.put("/rest/post/1")
    .expect(200)
    .send(updatePost)
    .end((error, res) => {

      models.Post.find({
        where: {
          id: 1
        },
        include: [ { model: models.Tag } ]
      }).then((updatedPost)=>{
        updatedPost.Tags[0].name.should.be.equal('aa');
        updatedPost.Tags[1].name.should.be.equal('bb');
        done();

      });
    });
  });

  it("update post editor", (done) => {

    //Setting is 'admin' authority
    sinon.stub(services.user, 'getAuthStatus', (app) =>{
      return {authority: 'admin'};
    });

    let updateEditorId = {
      editorId: 2
    }

    request.put("/rest/post/updateEditor/1")
    .expect(200)
    .send(updateEditorId)
    .end((error, res) => {
      models.Post.find({
        where: {
          id: 1
        }
      }).then((updatedPost)=>{
        updatedPost.EditorId.should.be.equal(updateEditorId.editorId);
        done();
      });
    });


  });

  it("delete post", (done) => {

    let postId = 1;

      request.delete("/rest/post/"+postId)
      .expect(200)
      .end((error, res) => {

        models.Post.findById(postId).then((result) =>{
          (result == null).should.true
          done(error);
        });

      });

    });

});
