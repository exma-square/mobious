
import router from 'koa-router';
import userController from './controllers/user';


exports.setup = function (app) {
  // register functions
  app.use(router(app));

  app.get('/rest/user/', userController.index);
};
