/* eslint-disable */

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';
import {Button, Table, Panel, Col} from 'react-bootstrap';

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
        <td>
          <Link to={`/profile/${user.id}`}>
            <Button>Profile</Button>
          </Link>
          <Button bsStyle='danger' bsSize='small' className='user-remove'
                  onClick={this._removeUser.bind(this, user.id)}>
                  X
          </Button>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
        <Panel className="app-users"
               header={<h3>{this._getIntlMessage('userManager.title')}</h3>}
               footer={<Link to='/userCreate'>
                        <Button bsStyle='success'>
                           {this._getIntlMessage('userManager.add')}
                         </Button>
                       </Link>}>
          <Table striped responsive>
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
              {this.state.users.map(this.renderUser)}
            </tbody>
          </Table>
        </Panel>
      </Col>
    );
  }
}

export default Users;
