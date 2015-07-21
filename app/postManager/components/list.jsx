/* eslint-disable */
import React from 'react';
import {Link} from 'react-router';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';
import {Table, Panel, Grid, Row, Col} from 'react-bootstrap';

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
          <td>
            {post.id}
          </td>
          <td>
            <Link to={`/postOne/${post.id}`} >
              {post.title}
            </Link>
          </td>
        </tr>
      );
    });
  },
  render() {
    return (
      <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
        <Panel className='app-posts'
               header={<h3>{this.getIntlMessage('postManager.title')}</h3>}>
          <Table striped responsive>
            <thead>
              <tr>
                <th>Post ID</th>
                <th colSpan='2'>
                  {this.getIntlMessage('postManager.name')}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.renderPosts()}
            </tbody>
          </Table>
        </Panel>
      </Col>
    );
  }
});
