import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';

class Single extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage


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


  _handleStoreChange = (state) => {
    this.setState(state);
  }

  render() {
    return (
     <div className='app--beans'>
        <h2>
          {() => {
            if (this.state.post !== undefined) {
              return this.state.post.title;
            }
          }()}
        </h2>
          {() => {
            if (this.state.post !== undefined) {
              return (
                <div id='postContent' dangerouslySetInnerHTML={{__html: this.state.post.content }}>
                </div>
              );
            }
          }()}
      </div>
    );
  }
}

export default Single;
