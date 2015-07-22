class BeanStore {

  constructor() {
    this.bindActions(this.alt.getActions('bean'));
    this.beans = [];
  }

  onFetchSuccess(beans) {
    return this.setState({beans});
  }
}

export default BeanStore;
