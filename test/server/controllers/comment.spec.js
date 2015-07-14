describe.only('comment', () => {

  before(async (done) => {

    let OwnerPost = {
      'title': 'OwnerPost',
      'tags': '',
      'content': 'for testComment to add-on'
    }

    let testComment = {
      'content': 'test index content'
    }

    let createdPost = await models.Post.create(OwnerPost);
    let createdComment = await models.Comment.create(testComment);
    await createdPost.setComments(createdComment);

    done();
  });

  it('list all comments.', async (done) => {

    let listCommentResult = await new Promise((resolve, reject) => {
      request.get('/comment/index')
      .expect(200)
      .end((error, res) => {
        if (error) return reject(error);
        return resolve(res.body);
      })
    });

    let Comments = res.body.comments;
    // listCommentResult.success.should.be.true;

    // done();
    try {
      Comments.should.be.Object;
      Comments.should.have.contain.keys('id', 'content');
      done();
    } catch (e) {
      done(e);
    }
  });
});
