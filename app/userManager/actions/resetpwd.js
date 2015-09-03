import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

class ResetPwdActions {
  constructor() {
    this.generateActions(
      'resetPasswordByAdminSuccess'
    );
  }
  resetPasswordByAdmin(id:string, params) {
    const promise = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();
      request.put(`${baseUrl}rest/user/resetPasswordByAdmin/${id}`)
      .send(params)
      .end((error, res) => {
        if (error) return resolve(error);
        this.actions.resetPasswordByAdminSuccess(res.body.success);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }

}

export default ResetPwdActions;
