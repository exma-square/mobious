import fs from "fs";

describe("post", () => {
  before((done)=>{
    sinon.stub(services.user, 'isAuthenticated', (app) =>{
      return true;
    });

    sinon.stub(services.user, 'getSessionUser', (app) =>{
      return {id: 1};
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
  it.only("update post", (done) => {
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
});
