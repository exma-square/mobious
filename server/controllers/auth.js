exports.status = function *() {
  let authStatus = services.user.getAuthStatus(this);
  this.body = authStatus
};
