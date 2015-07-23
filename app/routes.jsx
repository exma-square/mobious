import React from 'react';
import {Route} from 'react-router';
import {generateRoute} from 'utils/localized-routes';
// import requireAuth from 'components/shared/require-auth';
// let protectedPage = require('./components/protected');
// const decorated = requireAuth('admin', protectedPage);

export default (
  <Route component={require('./components/app')}>
    {generateRoute({
      paths: ['/', '/users'],
      component: require('./userManager/components/users')
    })}
    {generateRoute({
      paths: ['/guides'],
      component: require('./components/guides')
    })}
    {generateRoute({
      paths: ['/protected'],
      component: require('./components/protected')
    })}
    {generateRoute({
      paths: ['/profile/:id'],
      component: require('./userManager/components/profile')
    })}
    {generateRoute({
      paths: ['/login-info'],
      component: require('./pages/login-info')
    })}
    {generateRoute({
      paths: ['/beanList'],
      component: require('./beanManager/components/list')
    })}
    {generateRoute({
      paths: ['postList'],
      component: require('./postManager/components/list')
    })}
    {generateRoute({
      paths: ['/postOne/:id'],
      component: require('./postManager/components/single')
    })}
    {generateRoute({
      paths: ['/userCreate'],
      component: require('./userManager/components/create')
    })}
    {generateRoute({
      paths: ['/commentList'],
      component: require('./commentManager/components/list')
    })}
    <Route path='*' component={require('./pages/not-found')} />
  </Route>
);
