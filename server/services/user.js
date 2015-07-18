
export default class User {

    constructor (app, passport) {
      this.isAuthenticated = (app) => {
        return app.isAuthenticated();
      }

      this.getSessionUser = (app) => {
        return app.session.passport.user;
      }
    }

}
