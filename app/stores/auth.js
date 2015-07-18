import debug from 'debug';
class AuthStore {
  constructor() {
    this.bindActions(this.alt.getActions('auth'));
  }

  onLocalLoginSuccess(result) {
    debug('dev')('=== login result ===', result);
  }

}

export default AuthStore;
