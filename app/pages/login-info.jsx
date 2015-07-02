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

  render() {
    let redirectUri = baseUrl + decodeURIComponent(this.props.params.nextPath);
    let url = `/auth/facebook?redirect_uri=${redirectUri}`;

    return (
      <div>
        <h1>please login.</h1>
        <a href={url} >Sign in with Facebook</a>
      </div>
    );
  }

}

export default LoginInfo;
