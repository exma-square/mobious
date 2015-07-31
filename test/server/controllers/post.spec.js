import fs from "fs";

describe.only("post", () => {
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
  describe('find one and all', (done) => {
    it("file Upload", (done) => {
      request.post('/rest/post/fileUpload/')
      .field('extra_info', '{"in":"case you want to send json along with your file"}')
      .attach('file', '/tmp/img/1.png')
      .expect(200)
      .end(function(err, res) {
        console.log(res.body.fileNames)
        done(err)
      });
    });
  });
});
