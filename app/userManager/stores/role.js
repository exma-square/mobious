class RoleStore {

  constructor() {
    this.bindActions(this.alt.getActions('role'));
  }

  onFetchByAttributesSuccess(attributes) {
    return this.setState({attributes});
  }

}

export default RoleStore;
