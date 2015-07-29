import React, {Component, PropTypes} from 'react';
import {Button, Input} from 'react-bootstrap';
import Alloyeditor from 'components/shared/alloyeditor';

class Edit extends Component {
 mixins: [React.addons.LinkedStateMixin]

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

  _handleChange = (event) => {
    let state = this.state;
    state.post.title = event.target.value;
    this.setState(state);
  }

  render() {
    let body = null;
    if (this.state.post !== undefined) {
      body = (
        <form id='edit-post-form' onSubmit={this._handleSubmit} className='app--beans'>
          <input type='hidden' ref='id' value={this.state.post.id}></input>
          <Input type='text' ref='title' value={this.state.post.title} onChange={this._handleChange}/>
          <Alloyeditor content={this.state.post.content} ref='content' />
          <Button bsStyle='success' type="submit" form='edit-post-form'>Update</Button>
        </form>
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
