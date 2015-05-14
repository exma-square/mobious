
import router from 'koa-router';
import userController from './controllers/user';


exports.setup = (app) => {
  // register functions
  app.use(router(app));

  app.get('/rest/user/', userController.index);
  app.post('/rest/user/', userController.create);
  app.delete('/rest/user/:id', userController.delete);
};
