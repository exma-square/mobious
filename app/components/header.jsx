/* eslint-disable */

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';

import imageResolver from 'utils/image-resolver';
import Spinner from 'components/shared/spinner';
import LangPicker from 'components/shared/lang-picker';
import Img from 'components/shared/img';

import {Navbar, Nav} from 'react-bootstrap';
// Load styles for the header
// and load the `react-logo.png` image
// for the `<img src='' />` element
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
    flux: PropTypes.object.isRequired,
    locales: PropTypes.array.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  state = {
    spinner: false
  }

  componentDidMount() {
    this.props.flux
      .getStore('requests')
      .listen(this._handleRequestStoreChange);
  }

  _handleRequestStoreChange = ({inProgress}) => {
    return this.setState({spinner: inProgress});
  }

  render() {
    const {locales, flux} = this.props;
    const [activeLocale] = locales;

    return (
      <header className='app-header'>
        <Navbar brand={<Link to='/' className='app-logo'>
                         <Img src={reactLogo} alt='react-logo' width={75} height={75}/>
                         <span>mobious</span>
                       </Link>}>
          <Nav>
            <li>
              <Link to='/'>
                  {this._getIntlMessage('header.users')}
              </Link>
            </li>
            <li>
              <Link to='/guides'>
                  {this._getIntlMessage('header.guides')}
              </Link>
            </li>
            <li>
              <Link to='/protected'>
                  {this._getIntlMessage('header.protected')}
              </Link>
            </li>
            <li>
              <Link to='/commentList'>
                  {this._getIntlMessage('commentManager.title')}
              </Link>
            </li>
            <li>
              <Link to='/postList'>
                  {this._getIntlMessage('postManager.title')}
              </Link>
            </li>
          </Nav>
          <LangPicker
          activeLocale={activeLocale}
          onChange={flux.getActions('locale').switchLocale} />
        </Navbar>
        <Spinner active={this.state.spinner} />
      </header>
    );
  }
}

export default Header;
