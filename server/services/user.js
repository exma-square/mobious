import _ from 'lodash';
export default class User {

    constructor (app, passport) {
      this.isAuthenticated = (app) => {
        return app.isAuthenticated();
      }

      this.getSessionUser = (app) => {
        return app.session.passport.user;
      }

      this.getAuthStatus = (app) => {
        let isAuthenticated = this.isAuthenticated(app);
        let sessionUser = this.getSessionUser(app);
        let authority = '';
        if (_.has(sessionUser, 'Roles') && sessionUser.Roles.length !== 0) {
          authority = sessionUser.Roles[0].authority;

        }
        return {isAuthenticated, sessionUser, authority}
      }
    }

}
