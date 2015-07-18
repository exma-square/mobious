import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';

import imageResolver from 'utils/image-resolver';
import Spinner from 'components/shared/spinner';
import LangPicker from 'components/shared/lang-picker';

import {Navbar, Nav} from 'react-bootstrap';
// Load styles for the header
// and load the `react-logo.png` image
// for the `<img src='' />` element
let reactLogo;
if (process.env.BROWSER) {
  require('styles/application.scss');
  // require('styles/header.scss');
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
        <Navbar brand='Mobius'>
          <Nav>
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
          </Nav>
        </Navbar>
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
      </header>
    );
  }
}

export default Header;
