import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
import {Label} from 'react-bootstrap';

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
  renderTags = (tag) => {
    return (
      <span>
        <Label bsStyle='success'>{tag}</Label>&nbsp;
        </span>
      );
  }
    render() {
      return (
        <div className='app--beans'>

          {() => {
            if (this.state.post !== undefined) {
              return (
                <div>
                  <h2>
                    {this.state.post.title}
                  </h2>
                  {this.state.post.Tags.map(this.renderTags)}
                  <div id='postContent' dangerouslySetInnerHTML={{__html: this.state.post.content }}>
                  </div>

                </div>
              );
            }
          }()}
        </div>
      );
    }
  }

export default Single;
