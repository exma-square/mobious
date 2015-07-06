import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  require('postManager/styles/post.scss');
}

export default React.createClass({

  mixins: [ListenerMixin, IntlMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return this.props.flux.getStore('posts').getState();
  },
  componentWillMount() {
    return this.props.flux.getActions('posts').fetch();
  },
  componentDidMount() {
    this.listenTo(this.props.flux.getStore('posts'), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  renderPosts() {
    return this.state.posts.map((post, index) => {
      return (
        <tr className='post--row' key={index}>
          <td>{post.title}</td>
          <td>{post.content}</td>
        </tr>
      );
    });
  },
  render() {
    return (
      <div>
        <h1 className='text-center'>{this.getIntlMessage('postManager.title')}</h1>
        <table className='app--beans'>
          <thead>
            <tr>
              <th>
                  {this.getIntlMessage('postManager.name')}
              </th>
              <th>
                {this.getIntlMessage('postManager.content')}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderPosts()}
          </tbody>
        </table>
      </div>
    );
  }
});
