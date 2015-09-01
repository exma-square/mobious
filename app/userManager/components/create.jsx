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
    error: false,
    role: null,
    posts: this.props.flux
    .getStore('users')
    .getState().user,
  };

  handleSubmit(event) {
    event.preventDefault();

    let newUser = {
      email: this.refs.email.refs.input.getDOMNode().value,
      password: this.refs.pass.refs.input.getDOMNode().value,
      role: this.state.role,
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
            <span className='role'>Role</span>
            <Role onRoleChange={function(role){
                this.setState({
                  role: role
                });
              }.bind(this)}/>
            {this.state.error && (
              <p>Bad login information</p>
            )}
          </form>
        </Panel>
      </Col>
    );
  }
}

const Role = React.createClass({
  render () {
    return (
      <div>
        <Input type='radio' name='role' label='admin' onChange={function () {
          this.props.onRoleChange('admin');
        }.bind(this)}/>
      <Input type='radio' name='role' label='editor' onChange={function () {
          this.props.onRoleChange('editor');
        }.bind(this)}/>
      </div>
    )
  }
});


export default UserCreate;
