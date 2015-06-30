import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name='app' path='/' handler={require('./components/app')}>
    <DefaultRoute
      name='users'
      handler={require('./userManager/components/users')} />
    <Route
      name='guides'
      handler={require('./components/guides')} />
    <Route
      name='protected'
      handler={require('./components/protected')} />
    <Route
      name='profile'
      path='profile/:id'
      handler={require('./userManager/components/profile')} />
    <Route
      name='login-info'
      handler={require('./pages/login-info')} />
    <Route
      name='beanList'
      handler={require(`./beanManager/components/list`)} />
    <Route
      name='postList'
      handler={require(`./postManager/components/list`)} />
    <Route
      name='userCreate'
      handler={require('./userManager/components/create')} />

    <NotFoundRoute handler={require('./pages/not-found')} />
  </Route>
);
