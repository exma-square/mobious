import {baseUrl} from '../../server/config/init';
import request from 'superagent';

class AuthActions {
  constructor() {
    this.generateActions('fetchStatusSuccess');
  }

  fetchStatus() {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      request.get(`${baseUrl}rest/auth/status`)
      .end((error, res) => {
        if (error) return resolve(error);
        const status: Object = res.body.status;
        this.actions.fetchStatusSuccess(status);
        this.alt.getActions('requests').success();
        return resolve();
      });
    };

    this.alt.resolve(promise);
  }

}

export default AuthActions;
