/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
import {Button, Input, Panel, Col} from 'react-bootstrap';

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
      email: this.refs.email.refs.input.getDOMNode().value,
      pass: this.refs.pass.refs.input.getDOMNode().value
    };

    this.props.flux.getActions('users').create(newUser);
    this.context.router.transitionTo('/');
  }

  render() {
    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
        <Panel className="app-users"
               header={<h3>{this._getIntlMessage('userManager.add')}</h3>}
               footer={<Button bsStyle='success' type="submit" form='add-user-form'>
                         Create User
                       </Button>}>
          <form onSubmit={this.handleSubmit.bind(this)} id='add-user-form'>
            <Input type='text' ref='email' label='Email'/>
            <Input type='password' ref='pass' label='Password'/>
            {this.state.error && (
              <p>Bad login information</p>
            )}
          </form>
        </Panel>
      </Col>
    );
  }
}

export default UserCreate;
