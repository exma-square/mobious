describe.only('auth', () => {

  describe('local login spec', () => {

    before(async (done) => {

      let testUser = {
        'username': 'test',
        'password': 'test',
        'gender': 'male',
        'email': 'test@test.com',
        'phone': '(951)-385-6121',
        'cell': '(657)-919-3511',
        'picture': ''
      }
      await models.User.create(testUser);
      done();

    });

    it('do login should be success.', async (done) => {
      let loginUserFormData = {
        'username': 'test',
        'password': 'test'
      };

      let loginResult = await new Promise((resolve, reject) => {
        request.post('/auth/login')
        .send(loginUserFormData)
        .expect(200)
        .end((error, res) => {

          if (error) return reject(error);
          return resolve(res.body);
        })
      });

      loginResult.success.should.be.true;

      let authResult = await new Promise((resolve, reject) => {
        request.get('/auth/status')
        .expect(200)
        .end((error, res) => {
          if (error) return reject(error);
          return resolve(res.body);
        })
      });

      let sessionUser = authResult.sessionUser;
      let isAuthenticated = authResult.isAuthenticated;

      isAuthenticated.should.be.true;

      try {
        sessionUser.should.be.Object;
        sessionUser.should.have.contain.keys('id', 'username', 'email');
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
