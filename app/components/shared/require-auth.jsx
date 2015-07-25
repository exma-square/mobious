import React, {Component} from 'react';
import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

export default function requireAuth(role, ChildComponent) {
  class Authenticated extends Component {

    static async onEnter(next, transition, callback) {
      let flux = global.flux;
      let authStatus = {};
      if (flux) {
        authStatus = flux.getStore('auth').getState().authStatus;
      }
      else {
        authStatus = await new Promise((resolve, reject) => {
          request.get(`${baseUrl}auth/status`)
          .end((error, res) => {
            if (error) return reject(error);
            return resolve(res.body);
          });
        });
      }

      if (!authStatus.isAuthenticated) {
        transition.to('/login-info');
        return callback();
      }

      if (!role) return callback();

      if (authStatus.authority !== role) {
        transition.to('/login-info');
        return callback();
      }
      return callback();
    }

    render() {
      return <ChildComponent {...this.props} {...this.state} />;
    }
  }

  return Authenticated;
}
