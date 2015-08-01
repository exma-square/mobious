import fs from "fs";

describe("post", () => {
  describe('find one and all', (done) => {
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
  describe.only('find one and all', (done) => {
    it("file Upload", (done) => {
      request.post('/rest/post/fileUpload/')
      .attach('file', 'test/server/resources/mobious.png')
      .expect(200)
      .end(function(err, res) {
        done(err)
      });
    });
  });
});
