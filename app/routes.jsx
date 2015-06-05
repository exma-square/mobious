'use strict';

// disable `no-unused-vars` rule
/* eslint no-unused-vars: 0 */
import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';



export default (
  <Route name='app' path='/' handler={require(`./userManager/components/app.jsx`)}>
    <DefaultRoute
      name='userList'
      handler={require(`./userManager/components/user/list`)} />

    <Route
      name='userCreate'
      handler={require(`./userManager/components/user/create`)} />

    <Route
      name='guides'
      handler={require(`./userManager/components/guides`)} />
    <Route
      name='profile'
      path='profile/:seed'
      handler={require(`./userManager/components/profile`)} />
    <NotFoundRoute handler={require(`./pages/not-found`)} />
  </Route>
);
