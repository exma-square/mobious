import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
import {baseUrl} from '../../server/config/init';


class LoginInfo extends Component {

  static contextTypes = {
    router: PropTypes.func
  }

  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  handleSubmit(event) {
    event.preventDefault();

    let loginUser = {
      username: this.refs.username.getDOMNode().value,
      password: this.refs.password.getDOMNode().value
    };

    this.props.flux.getActions('auth').localLogin(loginUser);
    this.context.router.transitionTo('users');
  }


  render() {
    let redirectUri = baseUrl + decodeURIComponent(this.props.params.nextPath);
    let url = `/auth/facebook?redirect_uri=${redirectUri}`;

    return (
      <div>
        <h1>please login.</h1>
        <a href={url} >Sign in with Facebook</a>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <label><input ref="username" placeholder="username"/></label>
          <label><input ref="password" placeholder="password"/></label><br/>
          <button type="submit">login user</button>

        </form>

      </div>
    );
  }

}

export default LoginInfo;
