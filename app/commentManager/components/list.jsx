import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
import {Button, Panel, Col, Input} from 'react-bootstrap';

if (process.env.BROWSER) {
  require('commentManager/styles/comment.scss');
}

class CommentList extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  state = {
    comments: this.props.flux
    .getStore('comment')
    .getState().comments
  };

  componentWillMount() {
    return this.props.flux.getActions('comment').fetch();
  }

  componentDidMount() {
    this.props.flux
      .getStore('comment')
      .listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.flux
      .getStore('comment')
      .unlisten(this._handleStoreChange);
  }

  _handleStoreChange = (state) => {
    return this.setState(state);
  }

  _handleSubmit(event) {
    event.preventDefault();

    let newComment = {
      author: React.findDOMNode(this.refs.c_author.refs.input).value.trim(),
      content: React.findDOMNode(this.refs.c_content.refs.input).value.trim()
    };

    this.props.flux.getActions('comment').create(newComment);
    React.findDOMNode(this.refs.c_author.refs.input).value = '';
    React.findDOMNode(this.refs.c_content.refs.input).value = '';
  }

  renderComments() {
    return this.state.comments.map((comment, index) => {
      return (
        <div key={index}>
          <Panel header={'author :' + comment.author}>
            {comment.content}
          </Panel>
        </div>
      );
    });
  }

  renderCommentInput() {
    return (
      <div className='commentInput'>
        <Panel header='新增留言'>
          <Col md={6} sm={8} xs={12}>
            <form className='commentForm' onSubmit={this._handleSubmit.bind(this)}>
              <Input type='text' placeholder='我是誰...' ref='c_author' groupClassName='group-class' labelClassName='label-class' />
              <Input type='text' placeholder='我想說...' ref='c_content' groupClassName='group-class' labelClassName='label-class' />
              <Button bsStyle='success' type="submit" value="Post" >Create Comment</Button>
            </form>
          </Col>
        </Panel>
      </div>
    );
  }

  render() {
    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
        <div>
          <h1 className='text-center'>{this._getIntlMessage('commentManager.title')}</h1>
            <div>
              {this.renderComments()}
            </div>
        </div>
        <div>
          {this.renderCommentInput()}
        </div>
      </Col>
    );
  }
}

export default CommentList;
