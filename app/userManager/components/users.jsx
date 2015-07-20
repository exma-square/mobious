import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  require('userManager/styles/users.scss');
}

class Users extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired
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

  _handleStoreChange = (state) => {
    return this.setState(state);
  }

  _removeUser(id) {
    this.props.flux
      .getActions('users')
      .remove(id);
  }

  renderUser = (user, index) => {
    return (
      <tr className='user--row' key={index}>
        <td>{user.email}</td>
        <td className='text-center'>
          <Link to={`/profile/${user.id}`}>Profile</Link>
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
            {
              this.state.users
                .map(this.renderUser)
            }
          </tbody>
        </table>
        <p className='text-center'>
          <Link to='/userCreate'>{this._getIntlMessage('userManager.add')}</Link>
        </p>
      </div>
    );
  }

}

export default Users;
