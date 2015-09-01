import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

class UsersActions {
  constructor() {
    this.generateActions(
      'removeSuccess', 'fetchSuccess', 'createSuccess',
      'fetchBySeedSuccess', 'updateActivatedSuccess'
    );
  }
  create(params) {
    const promise = (resolve) => {
      // fake xhr
      this.alt.getActions('requests').start();
      let role = params.role;
      delete params.role;
      request.post(`${baseUrl}rest/user`)
      .send(params)
      .end((error, res) => {
        if (error) return resolve(error);

        let createdUser = res.body.user;
        console.log(createdUser);
        request.post(`${baseUrl}rest/role`)
        .send({
          authority: role,
          UserId: createdUser.id
        })
        .end((error2) => {
          if (error2) return resolve(error2);
          this.actions.createSuccess(createdUser);
          this.alt.getActions('requests').success();
          return resolve();
        });
      }, 300);
    };
    this.alt.resolve(promise);
  }


  remove(id: number) {
    const promise = (resolve) => {
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
    const promise = (resolve) => {
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

  updateActivated(id:string, params) {
    const promise = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();
      request.put(`${baseUrl}rest/user/activated/${id}`)
      .send(params)
      .end((error, res) => {
        if (error) return resolve(error);
        this.actions.updateActivatedSuccess(res.body.user);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }

}

export default UsersActions;
