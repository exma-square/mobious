import {baseUrl} from '../../server/config/init';
import request from 'superagent';

class AuthActions {
  constructor() {
    this.generateActions('localLoginSuccess', 'fetchStatusSuccess');
  }

  localLogin(params) {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      request.post(`${baseUrl}auth/login`)
      .send(params)
      .end((error, res) => {
        if (error) return resolve(error);
        this.actions.fetchStatusSuccess(res.body);
        this.alt.getActions('requests').success();
        return resolve();
      });
    };

    this.alt.resolve(promise);
  }

  fetchStatus() {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      request.get(`${baseUrl}auth/status`)
      .end((error, res) => {
        if (error) return resolve(error);
        this.actions.fetchStatusSuccess(res.body);
        this.alt.getActions('requests').success();
        return resolve(res.body);
      });
    };

    this.alt.resolve(promise);
  }
}

export default AuthActions;
