'use strict';

// disable `no-unused-vars` rule
/* eslint no-unused-vars: 0 */
import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import {APP_CLIENT_HOME} from '../server/config/init';



export default (
  <Route name='app' path='/' handler={require(`./${APP_CLIENT_HOME}/components/app.jsx`)}>
    <DefaultRoute
      name='userList'
      handler={require(`./${APP_CLIENT_HOME}/components/user/list`)} />

    <Route
      name='userCreate'
      handler={require(`./${APP_CLIENT_HOME}/components/user/create`)} />

    <Route
      name='guides'
      handler={require(`./${APP_CLIENT_HOME}/components/guides`)} />
    <Route
      name='profile'
      path='profile/:seed'
      handler={require(`./${APP_CLIENT_HOME}/components/profile`)} />
    <NotFoundRoute handler={require(`./pages/not-found`)} />
  </Route>
);
