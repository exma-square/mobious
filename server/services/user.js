
export default class User {

    constructor (app, passport) {
      this.isAuthenticated = (app) => {
        console.log('=== app.isAuthenticated ===', app.isAuthenticated);
        return app.isAuthenticated();
      }

      this.getSessionUser = (app) => {
        console.log('app.session', app);
        return app.session.passport.user;
      }
    }

}
