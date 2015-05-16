'use strict';


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

      request.post('http://localhost:8080/rest/user/')
      .send(params)
      .end((error, res) => {
        let createdUser = res.body.user;
        this.actions.createSuccess(createdUser);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }


  remove(id: number, index: number) {
    const promise: Function = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();

      request.del('http://localhost:8080/rest/user/'+id)
      .end(() => {

        that.actions.removeSuccess(index);
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

      request.get('http://localhost:8080/rest/user')
      // .set('Accept', 'application/json')
      .end((error, res) => {

        that.actions.fetchSuccess(res.body.users);
        that.alt.getActions('requests').success();
        return resolve();
      });
    };
    this.alt.resolve(promise);
  }
  fetchBySeed(seed: string) {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      request.get('http://localhost:8080/rest/user/'+seed)
      .end((error, res) => {
        const user: Object = res.body.user;
        this.actions.fetchBySeedSuccess(user);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };

    this.alt.resolve(promise);
  }
}



export default UsersActions;
