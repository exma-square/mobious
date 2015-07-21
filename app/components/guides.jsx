import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
import {Panel, Col} from 'react-bootstrap';

class Guides extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  componentWillMount() {
    this.props.flux
      .getActions('page-title')
      .set(this._getIntlMessage('guides.page-title'));
  }

  render() {
    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
        <Panel header={<h3>Guides</h3>}>
          <p>Coming soon...</p>
        </Panel>
      </Col>
    );
  }

}

export default Guides;
