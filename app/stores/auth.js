import debug from 'debug';
class AuthStore {
  constructor() {
    this.bindActions(this.alt.getActions('auth'));
  }

  onFetchStatusSuccess(status) {
    this._setAuthStatus(status);
  }

  _setAuthStatus(authStatus: Object) {
    debug('dev')('=== flux authStatus ===', authStatus);
    return this.setState({authStatus});
  }

}

export default AuthStore;
