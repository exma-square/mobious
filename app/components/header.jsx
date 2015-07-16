import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';

import imageResolver from 'utils/image-resolver';
import Spinner from 'components/shared/spinner';
import LangPicker from 'components/shared/lang-picker';
import Button from 'react-bootstrap/lib/Button';


// Load styles for the header
// and load the `react-logo.png` image
// for the `<img src='' />` element
require('styles/vendor/bootstrap.scss');

let reactLogo;
if (process.env.BROWSER) {
  require('styles/header.scss');
  reactLogo = require('images/react-logo.png');
}
else {
  reactLogo = imageResolver('images/react-logo.png');
}

class Header extends Component {

  static propTypes: {
    flux: PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  render() {
    return (
      <header className='app--header'>
        <Spinner store={this.props.flux.getStore('requests')} />
        <LangPicker
          store={this.props.flux.getStore('locale')}
          actions={this.props.flux.getActions('locale')} />
        <Link to='app' className='app--logo'>
          <img src={reactLogo} alt='react-logo' />
        </Link>
        <ul className='app--navbar un-select'>
          <li>
            <Link to='app'>
              {this._getIntlMessage('header.users')}
            </Link>
          </li>
          <li>
            <Link to='guides'>
              {this._getIntlMessage('header.guides')}
            </Link>
          </li>
          <li>
            <Link to='protected'>
              {this._getIntlMessage('header.protected')}
            </Link>
          </li>
          <li>
            <Link to='beanList'>
              {this._getIntlMessage('beanManager.title')}
            </Link>
          </li>
          <li>
            <Link to='postList'>
              {this._getIntlMessage('postManager.title')}
            </Link>
          </li>
        </ul>
        <hr />
          <Button>Default</Button>
          <Button bsStyle='primary'>Primary</Button>
          <Button bsStyle='success'>Success</Button>
          <Button bsStyle='info'>Info</Button>
          <Button bsStyle='warning'>Warning</Button>
          <Button bsStyle='danger'>Danger</Button><Button bsStyle='link'>Link</Button>
      </header>
    );
  }
}

export default Header;
