import {generateRoute} from 'utils/localized-routes';
import requireAuth from 'components/shared/require-auth';
let protectedPage = require('./components/protected');

const decorated = requireAuth('admin', protectedPage);

export default {
  path: '',
  component: require('./components/app'),
  childRoutes: [
    ...generateRoute({
      paths: ['/', '/users'],
      component: require('./userManager/components/users')
    }),
    {path: '/guides', component: require('./components/guides')},
    {path: '/protected', component: decorated, onEnter: decorated.onEnter},
    {path: '/profile/:id', component: require('./userManager/components/profile')},
    {path: '/login-info', component: require('./pages/login-info')},
    {path: '/beanList', component: require('./beanManager/components/list')},
    {path: '/postList', component: require('./postManager/components/list')},
    {path: '/postOne/:id', component: require('./postManager/components/single')},
    {path: '/userCreate', component: require('./userManager/components/create')}
  ]
};
