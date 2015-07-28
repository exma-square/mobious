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

    setTimeout(this._initAlloyEditor, 500);
  }


  _handleStoreChange = (state) => {
    this.setState(state);
  }

  _initAlloyEditor = () => {
    window.AlloyEditor.editable('postContent');
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
        <p id='postContent'>
          {() => {
            if (this.state.post !== undefined) {
              return this.state.post.content;
            }
          }()}
        </p>
      </div>
    );
  }
}

export default Single;
