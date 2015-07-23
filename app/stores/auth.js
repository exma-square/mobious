import debug from 'debug';
class AuthStore {
  constructor() {
    this.bindActions(this.alt.getActions('auth'));
  }

  onLocalLoginSuccess(result) {
    debug('dev')('=== login result ===', result);
  }

  onfetchStatusSuccess(authStatus) {
    return this.setState({authStatus});
  }


}

export default AuthStore;
