class AuthStore {
  constructor() {
    this.bindActions(this.alt.getActions('auth'));
    this.authStatus = [];
    this.loginMessage = '';
  }

  onLocalLoginFail(loginMessage) {
    return this.setState(loginMessage);
  }

  onLocalLoginSuccess(authStatus) {
    return this.setState({authStatus: authStatus.authStatus, loginMessage: authStatus.loginMessage});
  }

  onFetchStatusSuccess(authStatus) {
    return this.setState({authStatus: authStatus, loginMessage: authStatus.isAuthenticated === true ? 'success' : ''});
  }
}

export default AuthStore;
