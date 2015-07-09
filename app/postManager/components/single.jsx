import React, {Component} from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  require('postManager/styles/post.scss');
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
    return this.props.flux.getActions('posts').fetchOne(this.props.params.id);
  }

  componentDidMount() {
    this.listenTo(this.props.flux.getStore('posts'), this.handleStoreChange);
  }

  _handleStoreChange = this._handleStoreChange.bind(this)
  _handleStoreChange() {
    const post: ?Object = this.props.flux
      .getStore('posts')
      .getBySeed(this.props.params.id);

    return this.setState(post);
  }

  render() {
      const post: Object = this.state.post;

      return (
        <div className='app--beans'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      );



  }

}

export default Single;