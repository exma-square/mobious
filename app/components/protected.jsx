import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
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
      <div>
        <h1>Protected</h1>
        <p>secret mesaage</p>
      </div>
    );
  }

});

export default Protected;
