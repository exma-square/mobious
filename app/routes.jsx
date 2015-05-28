'use strict';

// disable `no-unused-vars` rule
/* eslint no-unused-vars: 0 */
import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name='app' path='/' handler={require('./plugins/temp_plugin/components/app')}>
    <DefaultRoute
      name='userList'
      handler={require('./plugins/temp_plugin/components/user/list')} />

    <Route
      name='userCreate'
      handler={require('./plugins/temp_plugin/components/user/create')} />

    <Route
      name='guides'
      handler={require('./plugins/temp_plugin/components/guides')} />
    <Route
      name='profile'
      path='profile/:seed'
      handler={require('./plugins/temp_plugin/components/profile')} />
    <NotFoundRoute handler={require('./plugins/temp_plugin/pages/not-found')} />
  </Route>
);
