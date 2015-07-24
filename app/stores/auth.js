class AuthStore {
  constructor() {
    this.bindActions(this.alt.getActions('auth'));
  }

  onFetchStatusSuccess(authStatus) {
    return this.setState({authStatus});
  }
}

export default AuthStore;
