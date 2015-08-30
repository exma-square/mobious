import React, {Component, PropTypes} from 'react';
import {Button, Input, Col, Panel} from 'react-bootstrap';
import {IntlMixin} from 'react-intl';
import Alloyeditor from 'components/shared/alloyeditor';
import TagsInput from 'react-tagsinput';
import DropImg from 'components/shared/dropImg';

if (process.env.BROWSER) {
  require('react-tagsinput/react-tagsinput.css');
}

class Edit extends Component {

  _getIntlMessage = IntlMixin.getIntlMessage

  static contextTypes = {
    router: PropTypes.func
  }

  static propTypes: {
    flux: React.PropTypes.object.isRequired
  }

  state = {
    post: this.props.flux
    .getStore('posts')
    .getBySeed(this.props.params.id).post,
    img: this.props.flux
    .getStore('posts').img
  };

  componentWillMount() {
    this.props.flux
    .getActions('posts')
    .fetchOne(this.props.params.id);
  }

  componentDidMount() {
    this.props.flux
    .getStore('posts')
    .listen(this._handleStoreChange);
  }

  _handleStoreChange = (state) => {
    this.setState(state);
  }

  _handleSubmit = (event) => {
    event.preventDefault();

    let newPost = {
      id: React.findDOMNode(this.refs.id).value,
      title: React.findDOMNode(this.refs.title.refs.input).value,
      content: React.findDOMNode(this.refs.content.refs.content).innerHTML,
      img: this.state.img,
      tags: this.refs.tags.getTags()
    };

    this.props.flux.getActions('posts').update(this.props.params.id, newPost);
    this.context.router.transitionTo('/postList');
  }

  _handleTitle = (event) => {
    let state = this.state;
    state.post.title = event.target.value;
    this.setState(state);
  }

  _handleTags = (event) => {
    let state = this.state;
    state.post.Tags = event;
    this.setState(state);
  }
  render() {
    let body = null;
    if (this.state.post !== undefined) {
      body = (
        <div className='form-horizontal'>
          <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
            <form id='edit-post-form' onSubmit={this._handleSubmit} className='app--beans'>
              <Panel className='app-posts'
            header={<h3>{this._getIntlMessage('post_edit.title')}</h3>}>
                <DropImg apiUrl={'/rest/post/fileUpload/'} flux={this.props.flux} preview={this.state.img}/>
                <input type='hidden' ref='id' value={this.state.post.id}></input>
                <Input label={this._getIntlMessage('post.label_title')} labelClassName='col-xs-2' wrapperClassName='col-xs-8' type='text' ref='title' value={this.state.post.title} onChange={this._handleTitle} />
                <div className='form-group'>
                  <label className='col-xs-2 control-label'>{this._getIntlMessage('post.label_tag')}</label>
                  <div className='col-xs-8'>
                    <TagsInput ref='tags' value={this.state.post.Tags} onChange={this._handleTags} placeholder={this._getIntlMessage('post.label_tagPlaceHolder')} />
                  </div>
                </div>
                <Alloyeditor label={this._getIntlMessage('post.label_content')} labelClassName='col-xs-2' wrapperClassName='col-xs-8' content={this.state.post.content} ref='content' />
              </Panel>
              <Col md={6} mdOffset={5} sm={4} smOffset={3} xs={12} >
                <Button bsStyle='success' type="button" onClick={this._handleSubmit} >{this._getIntlMessage('post_edit.submit')}</Button>
              </Col>
            </form>
          </Col>
        </div>
      );
    }
    else {
      body = (
        <div className='app--beans'>
          <p id=''></p>
        </div>
      );
    }

    return body;
  }

}

export default Edit;
