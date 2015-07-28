import React, {Component} from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

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
    return this.props.flux.getActions('posts').fetchOne(this.props.params.id);
  }


  componentDidMount() {
    this.props.flux
      .getStore('posts')
      .listen(this._handleStoreChange);
  }


  _handleStoreChange = this._handleStoreChange.bind(this)
  _handleStoreChange() {
    const post: ?Object = this.props.flux
      .getStore('posts')
      .getBySeed(this.props.params.id);

    this.setState(post);
  }

  render() {
    const post: Object = this.state.post;

    let body = null;

    if (post) {
      body = (
        <div className='app--beans'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      );
    }
    else {
      body = (
        <div className='app--beans'>
          <p ></p>
        </div>
      );
    }

    return body;
  }

}

export default Single;
