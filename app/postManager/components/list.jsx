/* eslint-disable */
import React from 'react';
import {Link} from 'react-router';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';
import {Table, Panel, Grid, Row, Col, Button, Thumbnail} from 'react-bootstrap';

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
        <Col md={4}>
          <Thumbnail src={'http://setn-iset.cdn.hinet.net/newsimages/2015/07/31/309955-XXL.jpg'} alt='242x200' key={index}>
            <h4>
              <Link to={`/postOne/${post.id}`}>{post.title}</Link>
            </h4>
            <p>30日瓊斯盃女籃，中華藍大勝紐西蘭20分，本屆最大焦點是加入台美混血的包喜樂，中文頗流利的她與隊友沒有磨合問題，除了球技一流外，
              甜美笑容更擄獲球迷的心 ......</p>
            <div>
              <Link to={`/postOne/${post.id}`}>
                <Button bsStyle='primary'>{this.getIntlMessage('postManager.read')}</Button>
              </Link>
              <Button bsStyle='default'>{this.getIntlMessage('postManager.edit')}</Button>
            </div>
          </Thumbnail>
        </Col>
      );
    });
  },
  render() {
    return (
      <Col md={10} mdOffset={1} sm={12} smOffset={0} xs={12}>
        <Panel className='app-posts'
          header={<h3>{this.getIntlMessage('postManager.title')}</h3>}>
          <Row>{this.renderPosts()}</Row>
        </Panel>
      </Col>
    );
  }
});
