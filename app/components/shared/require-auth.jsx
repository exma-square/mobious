import React, {Component} from 'react';
import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

export default function requireAuth(role, ChildComponent) {
  class Authenticated extends Component {

    static async onEnter(next, transition, callback) {
      let getAuthStatus = async () => {
        return await new Promise((resolve, reject) => {
          request.get(`${baseUrl}auth/status`)
          .end((error, res) => {
            if (error) return reject(error);
            return resolve(res.body);
          });
        });
      };

      // const nextPath = encodeURIComponent(transition.path);
      let authStatus = await getAuthStatus();
      // global.authStatus = authStatus;

      if (!authStatus.isAuthenticated) {
        transition.to('/login-info');
        return callback();
      }

      if (!role) return callback();

      if (authStatus.authority !== role) {
        transition.to('/login-info');
        return callback();
      }

      console.log('authStatus', authStatus);
      global.authStatus = authStatus;

      return callback();
    }

    render() {
      this.props.authStatus = global.authStatus;
      return <ChildComponent {...this.props} {...this.state} />;
    }
  }

  return Authenticated;
}
