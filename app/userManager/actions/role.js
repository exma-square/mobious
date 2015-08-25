import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

class RoleActions {
  constructor() {
    this.generateActions(
      'fetchByAttributesSuccess'
    );
  }
  fetchByAttributes(attribute: string) {
    const promise = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();
      request.get(`${baseUrl}rest/role/${attribute}`)
      // .set('Accept', 'application/json')
      .end((error, res) => {
        if (error) return resolve(error);
        that.actions.fetchByAttributesSuccess(res.body.attributes);
        that.alt.getActions('requests').success();
        return resolve();
      });
    };
    this.alt.resolve(promise);
  }
}

export default RoleActions;
