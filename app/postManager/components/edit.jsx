import React, {Component, PropTypes} from 'react';
import {Button, Input} from 'react-bootstrap';
import Alloyeditor from 'components/shared/alloyeditor';
import TagsInput from 'react-tagsinput';

if (process.env.BROWSER) {
  require('react-tagsinput/react-tagsinput.css');
}

class Edit extends Component {

  static contextTypes = {
    router: PropTypes.func
  }

  static propTypes: {
    flux: React.PropTypes.object.isRequired
  }

  state = this.props.flux
    .getStore('posts')
    .getBySeed(this.props.params.id)

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
      content: React.findDOMNode(this.refs.content.refs.content).innerHTML
    };

    this.props.flux.getActions('posts').update(newPost);
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
        <div>
          <input type='hidden' ref='id' value={this.state.post.id}></input>
          <TagsInput ref='tags' value={this.state.post.Tags} onChange={this._handleTags}/>
          <Input type='text' ref='title' value={this.state.post.title} onChange={this._handleTitle}/>
          <Alloyeditor content={this.state.post.content} ref='content' />
          <Button bsStyle='success' type="button" onClick={this._handleSubmit} >Update</Button>
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
