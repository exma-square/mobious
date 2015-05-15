'use strict';


import request from 'superagent';

import data from 'data/users.json';

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

      console.log('params', params);

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
      setTimeout(() => {
        const user: Object = data.users.find((u) => u.seed === seed);
        this.actions.fetchBySeedSuccess(user);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };

    this.alt.resolve(promise);
  }
}



export default UsersActions;
