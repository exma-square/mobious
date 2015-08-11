import React, {Component, PropTypes} from 'react';
import {Button, Input} from 'react-bootstrap';
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
    .getBySeed(this.props.params.id).post
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
      img: this.state.post.img,
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
          <form id='edit-post-form' onSubmit={this._handleSubmit} className='app--beans'>
            <DropImg apiUrl={'/rest/post/fileUpload/'} flux={this.props.flux} preview={this.state.post}/>
            <input type='hidden' ref='id' value={this.state.post.id}></input>
            <Input label={this._getIntlMessage('post.title')} labelClassName='col-xs-1' wrapperClassName='col-xs-10' type='text' ref='title' value={this.state.post.title} onChange={this._handleTitle} />
            <div className='form-group'>
              <label className='col-xs-1 control-label'>{this._getIntlMessage('post.tags')}</label>
              <div className='col-xs-10'>
                <TagsInput ref='tags' value={this.state.post.Tags} onChange={this._handleTags} placeholder={this._getIntlMessage('post.tagPlaceholder')} />
              </div>
            </div>
            <Alloyeditor label={this._getIntlMessage('post.content')} labelClassName='col-xs-1' wrapperClassName='col-xs-10' content={this.state.post.content} ref='content' />
            <Button bsStyle='success' type="button" onClick={this._handleSubmit} >Update</Button>
          </form>
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
