import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  require('userManager/styles/users.scss');
}

class Users extends Component {

  static contextTypes = {
    router: PropTypes.func
  }

  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  state = this.props.flux
    .getStore('users')
    .getState();

  componentWillMount() {
    this.props.flux
      .getActions('page-title')
      .set(this._getIntlMessage('userManager.page-title'));

    this.props.flux
      .getActions('users')
      .fetch();
  }

  componentDidMount() {
    this.props.flux
      .getStore('users')
      .listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.flux
      .getStore('users')
      .unlisten(this._handleStoreChange);
  }

  _handleStoreChange = this._handleStoreChange.bind(this)
  _handleStoreChange(state: Object) {
    return this.setState(state);
  }

  _removeUser(id: number) {
    this.props.flux
      .getActions('users')
      .remove(id);
  }

  _showProfile(id: string) {
    this.context.router
      .transitionTo('profile', {id});
  }

  _showCreateForm() {
    this.context.router
      .transitionTo('userCreate');
  }

  _renderUsers() {
    return this.state.users.map((user, index) => {
      return (
        <tr className='user--row' key={index}>
          <td>{user.email}</td>
          <td className='text-center'>
            <button
              onClick={this._showProfile.bind(this, user.id)}>
              Profile
            </button>
          </td>
          <td className='text-center'>
            <button
              className='user--remove'
              onClick={this._removeUser.bind(this, user.id)}>
              X
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 className='text-center'>
          {this._getIntlMessage('userManager.title')}
        </h1>
        <table className='app--users'>
          <thead>
            <tr>
              <th>
                {this._getIntlMessage('userManager.email')}
              </th>
              <th colSpan='2'>
                {this._getIntlMessage('userManager.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {this._renderUsers()}
          </tbody>
        </table>
        <p className='text-center'>
          <button
            ref='add-button'
            onClick={this._showCreateForm.bind(this)}>
            {this._getIntlMessage('userManager.add')}
          </button>
        </p>
      </div>
    );
  }

}

export default Users;
