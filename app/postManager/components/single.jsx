import React, {Component} from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  window.React = React;
  window.CKEDITOR_BASEPATH = '/alloyeditor/';
  require('alloyeditor/dist/alloy-editor/alloy-editor-all.js');
  // require('postManager/styles/post.scss');
  require('alloyeditor/dist/alloy-editor/assets/alloy-editor-ocean.css');
}
// export default React.createClass({
class Single extends Component {

  mixins: [ListenerMixin, IntlMixin]
  contextTypes: {
    router: React.PropTypes.func
  }
  static propTypes: {
    flux: React.PropTypes.object.isRequired
  }
  state = this.props.flux
    .getStore('posts')
    .getBySeed(this.props.params.id)

  componentWillMount() {
    console.log('this.props.params.id', this.props.params.id);
    return this.props.flux.getActions('posts').fetchOne(this.props.params.id);
  }


  componentDidMount() {
    this.props.flux
      .getStore('posts')
      .listen(this._handleStoreChange);

    window.AlloyEditor.editable('postContent');
  }


  _handleStoreChange = this._handleStoreChange.bind(this)
  _handleStoreChange() {
    const post: ?Object = this.props.flux
      .getStore('posts')
      .getBySeed(this.props.params.id);

    return this.setState(post);
  }

  render() {
    console.log('this.state.post', this.state.post);
    const post: Object = this.state.post;

    let body = null;

    if (post) {
      body = (
        <div className='app--beans'>
          <h2>{post.title}</h2>
          <p id='postContent'>{post.content}</p>
        </div>
      );
    }
    else {
      body = (
        <div className='app--beans'>
        </div>
      );
    }

    return body;
  }

}

export default Single;
