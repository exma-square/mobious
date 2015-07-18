exports.status = function *() {
  let isAuthenticated = services.user.isAuthenticated(this);
  let sessionUser = services.user.getSessionUser(this);

  this.body = {isAuthenticated, sessionUser}
};
