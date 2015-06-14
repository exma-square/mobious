'use strict';

import {baseUrl} from '../../../server/config/init';
var request = require('superagent');

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

        that.actions.fetchSuccess(res.body.beans);
        that.alt.getActions('requests').success();
        return resolve();
      });
    };
    this.alt.resolve(promise);
  }
}



export default BeanActions;
