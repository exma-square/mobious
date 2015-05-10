
import router from 'koa-router';
import mainController from './controllers/main';
import userController from './controllers/user';


exports.setup = function (app) {
  // register functions
  app.use(router(app));

  app.get('/rest', mainController.index);
  app.get('/rest/testData', mainController.testData);
  app.get('/rest/user/', userController.index);
};
