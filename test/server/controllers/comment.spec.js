describe.only('comment', () => {

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
    // console.log(Comments[0]);

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
