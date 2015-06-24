
import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  require('beanManager/styles/bean.scss');
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
    return this.props.flux.getStore('bean').getState();
  },
  componentWillMount() {
    return this.props.flux.getActions('bean').fetch();
  },
  componentDidMount() {
    this.listenTo(this.props.flux.getStore('bean'), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },

  renderBeans() {
    return this.state.beans.map((bean, index) => {
      return (
        <tr className='bean--row' key={index}>
          <td>{bean.name}</td>
        </tr>
      );
    });
  },
  render() {
    return (
      <div>
        <h1 className='text-center'>{this.getIntlMessage('beanManager.title')}</h1>
        <table className='app--beans'>
          <thead>
            <tr>
              <th>{this.getIntlMessage('beanManager.name')}</th>
            </tr>
          </thead>
          <tbody>
            {this.renderBeans()}
          </tbody>
        </table>
      </div>
    );
  }
});
