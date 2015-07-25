import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
import capitalize from 'lodash/string/capitalize';

if (process.env.BROWSER) {
  require('userManager/styles/profile.scss');
}

class Profile extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage
  _formatMessage = IntlMixin.formatMessage.bind(Object.assign({}, this, IntlMixin))

  state = this.props.flux
    .getStore('users')
    .getBySeed(this.props.params.id)

  componentWillMount() {
    this._setPageTitle();

    this.props.flux
      .getActions('users')
      .fetchBySeed(this.props.params.id);
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

  _handleStoreChange = () => {
    const user = this.props.flux
      .getStore('users')
      .getBySeed(this.props.params.id);

    this.setState(user);
    this._setPageTitle();
  }

  _setPageTitle = () => {
    let title;
    if (this.state.user) {
      const user = this.state.user;
      const fullName = user.username;

      title = this._getIntlMessage('profile.page-title');
      title = this._formatMessage(title, {fullName});
    }
    else {
      title = this._getIntlMessage('profile.not-found-page-title');
    }

    // Set page title
    this.props.flux
      .getActions('page-title')
      .set.defer(title);
  }

  _getFullName({first, last}) {
    return `${capitalize(first)} ${capitalize(last)}`;
  }

  render() {
    if (this.state.user) {
      const user: Object = this.state.user;
      const picture = JSON.parse(user.picture);
      let imgSrc = 'about:blank';

      if (picture !== null) imgSrc = picture.medium;

      return (
        <div className='app--profile'>
          <h2>{user.username}</h2>
          <img
            src={imgSrc}
            alt='profile picture' />
        </div>
      );
    }

    return (
      <h2>User not found</h2>
    );
  }

}

export default Profile;
