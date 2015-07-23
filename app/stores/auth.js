import debug from 'debug';
class AuthStore {
  constructor() {
    this.bindActions(this.alt.getActions('auth'));
  }

  onLocalLoginSuccess(result) {
    debug('dev')('=== login result ===', result);
  }

  onFetchStatusSuccess(authStatus) {
    return this.setState({authStatus});
  }

  onGetAuthStatus() {
    return this.getState();
  }


}

export default AuthStore;
