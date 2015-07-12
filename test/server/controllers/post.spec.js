
describe("post", () => {

  before((done)=>{
    sinon.stub(services.user, 'isAuthenticated', (app) =>{
      return true;
    });

    done();
  });

  after((done) =>{
    services.user.isAuthenticated.restore();
    done();
  });


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

  it("find single post", async (done) => {

    let TestPost = {
      'title'  : 'article1',
      'tags'   : 'lot of tags',
      'content': 'QAQ'
    }
    let SinglePost = await models.Post.create(TestPost);

    request.get('/rest/post/' + SinglePost.dataValues.id)
    .expect(200)
    .end((error, res) => {

      res.id != null;

      done(error);
    });

  });


});
