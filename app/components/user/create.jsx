'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';


export default React.createClass({
  displayName: 'userCreate',
  mixins: [ListenerMixin, IntlMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      error: false
    };

  },


  handleSubmit (event) {
    event.preventDefault();

    let newUser = {
      email: this.refs.email.getDOMNode().value,
      pass: this.refs.pass.getDOMNode().value
    };

    this.props.flux.getActions('users').create(newUser);

    this.context.router.transitionTo('userList');



  },

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
        <label><input ref="pass" placeholder="password"/></label><br/>
        <button type="submit">create user</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    );
  }
});
