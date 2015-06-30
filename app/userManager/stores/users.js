import {isEmpty} from 'lodash';

class UsersStore {

  constructor() {
    this.bindActions(this.alt.getActions('users'));
    this.users = [];
  }

  static getBySeed(id) {
    const users: Array<Object> = this.getState().users;
    let singleUser = this.getState().user;
    if (singleUser === null) singleUser = users.find((user) => user.id.toString() === id.toString());
    return {user: singleUser};
  }

  onRemoveSuccess(id) {
    const users: Array<Object> = this.users.slice();
    let removeIndex = -1;
    users.forEach((user, index) => {
      if (user.id === id) removeIndex = index;
    });

    if (removeIndex >= 0) users.splice(removeIndex, 1);

    return this.setState({users});
  }

  onCreateSuccess(user) {
    const users: Array<Object> = this.users.slice();
    users.push(user);

    return this.setState({users});
  }

  onFetchSuccess(users) {
    if (isEmpty(this.users)) {
      // just apply the new users
      // this is called on every server rendering
      return this.setState({users});
    }

    const merged: Array<Object> = this.users.slice();
    users.forEach((user) => {
      // update the most recent data into store
      let match: ?Object = merged.find((u) => u.seed === user.seed) || null;
      if (match) {
        match = user;
      }
      // push the new user
      else {
        merged.push(user);
      }
    });

    return this.setState({users: merged});
  }

  onFetchBySeedSuccess(user) {
    return this.setState({user});
  }

}

export default UsersStore;
