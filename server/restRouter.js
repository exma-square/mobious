
import router from 'koa-router';
import mainController from './controllers/main';


exports.setup = function (app) {
  // register functions
  app.use(router(app));

  app.get('/rest', mainController.index);
  app.get('/rest/testData', mainController.testData);
};
