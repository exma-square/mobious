'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';
import {Link} from 'react-router';





if (process.env.BROWSER) {
  require('styles/users.scss');
}

export default React.createClass({
  displayName: 'UsersList',
  mixins: [ListenerMixin, IntlMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return this.props.flux.getStore('users').getState();
  },
  componentWillMount() {
    return this.props.flux.getActions('users').fetch();
  },
  componentDidMount() {
    this.listenTo(this.props.flux.getStore('users'), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  removeUser(id: number, index: number) {

    console.log('removeUser id', id);
    console.log('removeUser index', index);
    return this.props.flux.getActions('users').remove(id, index);
  },
  showProfile(seed: number) {
    return this.context.router.transitionTo('profile', {seed});
  },
  renderUsers() {
    return this.state.users.map((user, index) => {
      return (
        <tr className='user--row' key={index}>
          <td>{user.email}</td>
          <td className='text-center'>
            <button
              onClick={this.showProfile.bind(this, user.id)}>
              Profile
            </button>
          </td>
          <td className='text-center'>
            <button
              className='user--remove'
              onClick={this.removeUser.bind(this, user.id, index)}>
              X
            </button>
          </td>
        </tr>
      );
    });
  },
  render() {
    return (
      <div>
        <h1 className='text-center'>{this.getIntlMessage('users.title')}</h1>
        <table className='app--users'>
          <thead>
            <tr>
              <th>{this.getIntlMessage('users.email')}</th>
              <th colSpan='2'>
                {this.getIntlMessage('users.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers()}
          </tbody>
        </table>
        <p className='text-center'>
          <Link to='userCreate'>
            userCreate
          </Link>
        </p>
      </div>
    );
  }
});
