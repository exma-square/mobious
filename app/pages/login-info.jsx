import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
import {baseUrl} from '../../server/config/init';
import {Button, Panel, Col, Input, Alert} from 'react-bootstrap';


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

  state = {
    authStatus: this.props.flux
    .getStore('auth')
    .getState().authStatus
  };

  componentWillMount() {
    this.props.flux
    .getActions('page-title')
    .set(this._getIntlMessage('protected.page-title'));

    this.state.authStatus = this.props.flux.getStore('auth').getState().authStatus;
    this.state.loginMessage = this.props.flux.getStore('auth').getState().loginMessage;
  }

  componentDidMount() {
    this.props.flux
    .getStore('auth')
    .listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.flux
    .getStore('auth')
    .unlisten(this._handleStoreChange);
  }

  _handleStoreChange = (state) => {
    return this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let loginUser = {
      username: this.refs.username.refs.input.getDOMNode().value,
      password: this.refs.password.refs.input.getDOMNode().value
    };

    this.props.flux.getActions('auth').localLogin(loginUser);
    // this.context.router.transitionTo('users');
  }
  renderLoginForm() {
    let redirectUri = baseUrl + decodeURIComponent(this.props.params.nextPath);
    let url = `/auth/facebook?redirect_uri=${redirectUri}`;
    if (!this.state.authStatus.isAuthenticated) {
      return (
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
      );
    }
  }

  renderLoginMessage() {
    if (this.state.loginMessage !== '') {
      let alertStyle = this.state.loginMessage === 'success' ? 'success' : 'danger';
      return (
        <Alert bsStyle={alertStyle}>
          <strong>{this._getIntlMessage(`loginMessage.${this.state.loginMessage}.title`)}</strong>
          <p>{this._getIntlMessage(`loginMessage.${this.state.loginMessage}.depiction`)}</p>
        </Alert>
      );
    }
  }

  render() {
    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
        {this.renderLoginMessage()}
        {this.renderLoginForm()}
      </Col>
    );
  }
}
export default LoginInfo;
