import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  require('commentManager/styles/comment.scss');
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
    return this.props.flux.getStore('comment').getState();
  },
  componentWillMount() {
    return this.props.flux.getActions('comment').fetch();
  },
  componentDidMount() {
    this.listenTo(this.props.flux.getStore('comment'), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  renderComments() {
    return this.state.comment.map((comment, index) => {
      return (
        <div key={index}>
          <h3>
            {comment.author}
          </h3>
          <p>
            {comment.content}
          </p>
        </div>
      );
    });
  },
  render() {
    return (
      <div>
        <h1 className='text-center'>{this.getIntlMessage('commentManager.title')}</h1>
          <div>
            {this.renderComments()}
          </div>
      </div>
    );
  }
});
