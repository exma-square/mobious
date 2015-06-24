import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

class BeanActions {
  constructor() {
    this.generateActions(
      'fetchSuccess'
    );
  }

  fetch() {
    const promise: Function = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();

      request.get(baseUrl + 'rest/bean')
      .end((error, res) => {
        if (error) return resolve(error);
        that.actions.fetchSuccess(res.body.beans);
        that.alt.getActions('requests').success();
        return resolve();
      });
    };
    this.alt.resolve(promise);
  }
}

export default BeanActions;
