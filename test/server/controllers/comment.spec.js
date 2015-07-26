describe('comment', () => {
  describe('index comments', () => {
    before(async (done) => {

      let testComment = {
        'author' : 'test comment author',
        'content': 'test index content'
      }

      let createdComment = await models.Comment.create(testComment);
      done();
    });

    it("index all comments", async (done) => {

      let indexCommentResult = await new Promise((resolve, reject) => {
        request.get("/rest/comment/")
        .expect(200)
        .end((error, res) => {
          if (error) return reject(error);
          return resolve(res.body.comments);
        });
      });
      let Comments = indexCommentResult;

      try {
        Comments.should.be.Array;
        Comments[0].id.should.be.greaterThan(0);
        Comments[0].should.have.contain.keys('id', 'author', 'content');
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  describe('create comment', () => {
    it("create an comment", async (done) => {

      let seedComment = {
        'author' : 'seedAuthor',
        'content': 'seedContent'
      };

      let createdCommentResult = await new Promise((resolve, reject) => {
        request.post("/rest/comment/")
        .send(seedComment)
        .expect(200)
        .end((error, res) => {
          if (error) return reject(error);
          return resolve(res.body.comment);
        });
      });

      let result = await createdCommentResult;
      console.log('result', result);
      try {
        result.should.be.Object;
        result.id.should.be.greaterThan(0);
        result.author.should.equal(seedComment.author);
        done();
      } catch (e) {
        done(e);
      }

    });
  });
});
