/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';
import {Table, Panel, Grid, Row, Col} from 'react-bootstrap';

if (process.env.BROWSER) {
  require('postManager/styles/post.scss');
}

class Posts extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  state = {
    posts: this.props.flux
    .getStore('posts')
    .getState().posts,
    authStatus: this.props.flux
    .getStore('auth')
    .getState().authStatus
  };

  componentWillMount() {
    // this.props.flux
    //   .getActions('page-title')
    //   .set(this._getIntlMessage('postManager.page-title'));

    this.props.flux
      .getActions('posts')
      .fetch();
  }

  componentDidMount() {
    this.props.flux
      .getStore('posts')
      .listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.flux
      .getStore('posts')
      .unlisten(this._handleStoreChange);

  }

  _handleStoreChange = (state) => {
    state.authStatus = this.props.flux.getStore('auth').getState().authStatus
    return this.setState(state);
  }

  renderPost = (post, index) => {
    return (
      <tr className='post--row' key={index}>
        <td>
          {post.id}
        </td>
        <td>
          <Link to={`/postOne/${post.id}`} >
            {post.title}
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
        <Panel className='app-posts'
               header={<h3>{this._getIntlMessage('postManager.title')}</h3>}>
          <Table striped responsive>
            <thead>
              <tr>
                <th>Post ID</th>
                <th colSpan='2'>
                  {this._getIntlMessage('postManager.name')}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map(this.renderPost)}
            </tbody>
          </Table>
        </Panel>
      </Col>
    );
  }
}

export default Posts;
