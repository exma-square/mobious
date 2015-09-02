/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';

import imageResolver from 'utils/image-resolver';
import Spinner from 'components/shared/spinner';
import LangPicker from 'components/shared/lang-picker';
import Img from 'components/shared/img';

import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap';
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
    spinner: false,
    authStatus: this.props.flux
    .getStore('auth')
    .getState().authStatus
  }

  componentDidMount() {
    this.props.flux
    .getStore('requests')
    .listen(this._handleRequestStoreChange);
    this.props.flux
    .getStore('auth')
    .listen(this._handleAuthStoreChange);
  }

  _handleRequestStoreChange = ({inProgress}) => {
    return this.setState({spinner: inProgress});
  }

  _handleAuthStoreChange = ({authStatus}) => {
    return this.setState({authStatus: authStatus});
  }
  renderLogin() {
    if (this.state.authStatus.isAuthenticated) {
      return (
        <NavItem href='logout'>{this.state.authStatus.sessionUser.username}&nbsp;
          <Glyphicon glyph='hand-right'/>
        </NavItem>
      );
    }
    else {
      return (
        <li>
          <Link to='/login-info'>
            <Glyphicon glyph='user'/>
            {this._getIntlMessage('loginMessage.login')}
          </Link>
        </li>
      );
    }
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
                  {this._getIntlMessage('header.posts')}
              </Link>
            </li>
          </Nav>
          <Nav navbar right>
            {this.renderLogin()}
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
