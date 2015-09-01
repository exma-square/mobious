import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';
import {Table, Panel, Col, Glyphicon, Input, Button} from 'react-bootstrap';

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
    .getState().authStatus,
    editors: this.props.flux
    .getStore('role')
    .getState().attributes
  };

  componentWillMount() {
    this.props.flux
    .getActions('page-title')
    .set(this._getIntlMessage('postManager.page-title'));
    this.props.flux
    .getActions('posts')
    .fetch();
    this.props.flux.
    getActions('role').fetchByAttributes('editor');
  }

  componentDidMount() {
    this.props.flux
    .getStore('posts')
    .listen(this._handleStoreChange);
    this.props.flux
    .getStore('role')
    .listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.flux
    .getStore('posts')
    .unlisten(this._handleStoreChange);
    this.props.flux
    .getStore('role')
    .unlisten(this._handleStoreChange);
  }

  _handleStoreChange = (state) => {
    state.authStatus = this.props.flux.getStore('auth').getState().authStatus;
    state.editors = this.props.flux.getStore('role').getState().attributes;
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
        {this.renderEdit(post)}
        {this.renderEditor(post.EditorId, post.id)}
      </tr>
    );
  }
  renderEditor(EditorId, postId) {
    if (this.state.authStatus.authority === 'admin') {
      return (
        <td>
          <Input type='select' value={EditorId} onChange={this.updateEditor.bind(this, postId)}>
            <option value='0'>select...</option>
            {this.state.editors.map(this.renderEditorsOptions)}
          </Input>
        </td>
      );
    }
  }
  renderEditorsOptions = (editor, index) => {
    return (
      <option value={editor.id} key={index}>{editor.username}</option>
    );
  }
  updateEditor = (postId, event) => {
    this.props.flux.getActions('posts').updateEditor(postId, {editorId: event.target.value});
  }
  renderEdit(post) {
    if (this.state.authStatus.authority === 'editor') {
      let userId = this.state.authStatus.sessionUser.id;
      if (userId === post.CreatorId || userId === post.EditorId) {
        return (
          <div>
            <td>
              <Link to={`/postEdit/${post.id}`} >
                <Glyphicon glyph='pencil' />
              </Link>
            </td>
            <td>
              <Button bsStyle='danger' bsSize='small'
                onClick={this._removePost.bind(this, post.id)}>
                <Glyphicon glyph='trash' className="" />
              </Button>
            </td>
          </div>
        );
      } else return ( <div><td></td><td></td></div> );
    }
  }
  _removePost(id) {
    this.props.flux
    .getActions('posts')
    .remove(id);
  }
  renderTh(isEditorOrCreator, message) {
    if (isEditorOrCreator) {
      return (
        <th>
          {message}
        </th>
      );
    }
  }

  renderCreateBtn(isEditorOrCreator) {
    if (isEditorOrCreator) {
      return (
        <Col md={6} mdOffset={4} sm={8} smOffset={4} xs={12}>
          <Link to={'/postCreate/'}>
            <Button bsStyle='success'>
              新增文章
            </Button>
          </Link>
        </Col>
      );
    }
  }
  render() {
    let isEditorOrCreator = false;
    let userId = this.state.authStatus.authority === '' ? 0 : this.state.authStatus.sessionUser.id;
    this.state.posts.forEach((post) => {
      if (post.CreatorId === userId || post.EditorId === userId) {
        isEditorOrCreator = true;
      }
    });


    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={4} xs={12}>
        <Panel className='app-posts'
          header={<h3>{this._getIntlMessage('postManager.title')}</h3>}>
          <Table striped responsive>
            <thead>
              <tr>
                <th>Post ID</th>
                <th>
                  {this._getIntlMessage('postManager.name')}
                </th>
                {this.renderTh(isEditorOrCreator, this._getIntlMessage('postManager.edit'))}
                {this.renderTh(isEditorOrCreator, this._getIntlMessage('postManager.delete'))}
                {() => {
                  if (this.state.authStatus.authority === 'admin') {
                    return (
                      <th>
                        {this._getIntlMessage('postManager.editor')}
                      </th>
                    );
                  }
                }()}
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map(this.renderPost)}
            </tbody>
          </Table>
        </Panel>
        {this.renderCreateBtn(isEditorOrCreator)}
      </Col>
    );
  }
}

export default Posts;
