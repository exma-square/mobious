import React, {Component} from 'react';
import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

const requireAuth = (role, ChildComponent) => {
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

      const nextPath = encodeURIComponent(transition.path);


      let authStatus = await getAuthStatus();
      let isAuthenticated = authStatus.isAuthenticated;

      console.log('isAuthenticated', isAuthenticated);

      if (!isAuthenticated) {
        transition.to('/login-info', {nextPath});
        return callback();
      }

      let sessionUser = authStatus.sessionUser;

      if (!sessionUser) {
        transition.to('/login-info', {nextPath});
        return callback();
      }

      if (!role) return callback();

      if (sessionUser.Roles.length === 0) {
        transition.to('/login-info', {nextPath});
        return callback();
      }

      let authority = sessionUser.Roles[0].authority;
      if (authority !== role) {
        transition.to('/login-info', {nextPath});
        return callback();
      }

      return callback();
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return Authenticated;
};

export default requireAuth;
