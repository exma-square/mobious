class RoleStore {

  constructor() {
    this.bindActions(this.alt.getActions('role'));
    this.attributes = [];
  }

  onFetchByAttributesSuccess(attributes) {
    return this.setState({attributes});
  }

}

export default RoleStore;
