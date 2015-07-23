import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
import {Panel, Col} from 'react-bootstrap';
import requireAuth from 'components/shared/require-auth';

const Protected = requireAuth('admin', class Protected extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  componentWillMount() {
    this.props.flux
      .getActions('page-title')
      .set(this._getIntlMessage('protected.page-title'));
  }

  render() {
    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
        <Panel header={<h3>Protected</h3>}>
          <p>secret mesaage</p>
        </Panel>
      </Col>
    );
  }

});

export default Protected;
