'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {capitalize} from 'lodash';

if (process.env.BROWSER) {
  require('userManager/styles/profile.scss');
}

export default React.createClass({
  displayName: 'Profile',
  mixins: [ListenerMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  getInitialState() {
    const seed: string = this.context.router.getCurrentParams().seed;
    return this.props.flux.getStore('users').getBySeed(seed);
  },
  componentWillMount() {

    if(!this.state.user){
      const seed: string = this.context.router.getCurrentParams().seed;
      return this.props.flux.getActions('users').fetchBySeed(seed);
    }
  },
  componentDidMount() {
    this.listenTo(this.props.flux.getStore('users'), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  render() {
    if (this.state.user) {
      const user: Object = this.state.user;
      return (
        <div className='app--profile'>
          <h2>{`${capitalize(user.username)}`}</h2>
          <img
            src={user.picture.medium}
            alt='profile picture' />
        </div>
      );
    }
    else {
      return (
        <h2>User not found</h2>
      );
    }
  }
});
