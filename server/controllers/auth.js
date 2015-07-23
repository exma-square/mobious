import _ from 'lodash';

exports.status = function *() {
  let isAuthenticated = services.user.isAuthenticated(this);
  let sessionUser = services.user.getSessionUser(this);
  let authority = '';
  if (_.has(sessionUser, 'Roles') && sessionUser.Roles.length !== 0) {
    authority = sessionUser.Roles[0].authority;

  }
  this.body = {isAuthenticated, sessionUser, authority}
};
