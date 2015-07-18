import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  require('userManager/styles/users.scss');
}

class UserCreate extends Component {

  static contextTypes = {
    router: PropTypes.func
  }

  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  state = {
    error: false
  };

  handleSubmit(event) {
    event.preventDefault();

    let newUser = {
      email: this.refs.email.getDOMNode().value,
      pass: this.refs.pass.getDOMNode().value
    };

    this.props.flux.getActions('users').create(newUser);
    this.context.router.transitionTo('users');
  }

  render() {
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
}

export default UserCreate;
