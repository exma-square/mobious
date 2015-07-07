describe.only('auth', () => {

  describe('local login spec', () => {

    before(async (done) => {

      let createTestUser = {
        'username': 'test',
        'password': 'test',
        'gender': 'male',
        'email': 'test@test.com',
        'phone': '(951)-385-6121',
        'cell': '(657)-919-3511',
        'picture': ''
      }

      await models.User.create(testUser);
      console.log("=====");
      done();

    });

    it('do login should success.', async (done) => {
      let loginUser = {
        'username': 'test',
        'password': 'test'
      };

      let doLogin = await new Promise((resolve, reject) => {
        request.post('/auth/login')
        .send(loginUser)
        .expect(302)
        .end((error, res) => {
          if (error) return reject(error);
          return resolve("OK");
        })
      });

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

      // sessionUser.should.be.Object;
      // sessionUser.id.should.be.Number;
      // sessionUser.should.be.equals("test@test.com");
      //
      done();


    });
  });
});
