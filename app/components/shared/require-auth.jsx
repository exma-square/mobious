import React, {Component} from 'react';
import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

const requireAuth = (ChildComponent) => {
  class Authenticated extends Component {

    static async willTransitionTo(transition, params, query, callback) {
      let getAuthStatus = async () => {
        return await new Promise((resolve, reject) => {
          request.get(`${baseUrl}rest/auth/status`)
          .end((error, res) => {
            if (error) return reject(error);
            return resolve(res.body);
          });
        });
      };

      const nextPath = encodeURIComponent(transition.path);

      let isAuthenticated = false;
      let authStatus = await getAuthStatus();

      // assume user is not duthenticated
      isAuthenticated = authStatus.isAuthenticated;
      if (!isAuthenticated) {
        transition.redirect('login-info', {nextPath});
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
