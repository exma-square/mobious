import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

class UsersActions {
  constructor() {
    this.generateActions(
      'removeSuccess', 'fetchSuccess', 'createSuccess',
      'fetchBySeedSuccess'
    );
  }
  create(params) {
    const promise: Function = (resolve) => {
      // fake xhr
      this.alt.getActions('requests').start();

      request.post(`${baseUrl}rest/user`)
      .send(params)
      .end((error, res) => {
        if (error) return resolve(error);

        let createdUser = res.body.user;
        this.actions.createSuccess(createdUser);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }


  remove(id: number) {
    const promise: Function = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();

      request.del(`${baseUrl}rest/user/${id}`)
      .end(() => {
        that.actions.removeSuccess(id);
        that.alt.getActions('requests').success();
        return resolve();
      });
    };
    this.alt.resolve(promise);
  }


  fetch() {
    const promise: Function = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();

      request.get(`${baseUrl}rest/user`)
      // .set('Accept', 'application/json')
      .end((error, res) => {
        if (error) return resolve(error);
        that.actions.fetchSuccess(res.body.users);
        that.alt.getActions('requests').success();
        return resolve();
      });
    };
    this.alt.resolve(promise);
  }
  fetchBySeed(id: string) {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      request.get(`${baseUrl}rest/user/${id}`)
      .end((error, res) => {
        if (error) return resolve(error);
        const user: Object = res.body.user;
        this.actions.fetchBySeedSuccess(user);
        this.alt.getActions('requests').success();
        return resolve();
      });
    };

    this.alt.resolve(promise);
  }
}

export default UsersActions;
