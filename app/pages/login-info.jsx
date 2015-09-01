import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
import {baseUrl} from '../../server/config/init';
import {Button, Panel, Col, Input} from 'react-bootstrap';


class LoginInfo extends Component {

  static contextTypes = {
    router: PropTypes.func
  }

  static propTypes = {
    flux: React.PropTypes.object.isRequired,
    locales: PropTypes.array.isRequired,
    params: React.PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  handleSubmit(event) {
    event.preventDefault();

    let loginUser = {
      username: this.refs.username.refs.input.getDOMNode().value,
      password: this.refs.password.refs.input.getDOMNode().value
    };

    this.props.flux.getActions('auth').localLogin(loginUser);
    this.context.router.transitionTo('users');
  }


  render() {
    let redirectUri = baseUrl + decodeURIComponent(this.props.params.nextPath);
    let url = `/auth/facebook?redirect_uri=${redirectUri}`;

    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
        <Panel header={'Login'}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Input type='text' ref="username" placeholder="username"/>
            <Input type='password' ref="password" placeholder="password"/>
            <Button type="submit">login user</Button>
            <a href={url} style={{'marginLeft': 10}}>
              <Button>Sign in with Facebook</Button>
            </a>
          </form>
        </Panel>
      </Col>
    );
  }

}

export default LoginInfo;
