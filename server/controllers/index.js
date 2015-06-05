
import UserController from './user';
import Router from 'koa-router';

export default class Routes {

    constructor () {
      var router = new Router();
      this.router = router;
    }

    setupRoute(app) {

      this.router.get('/rest/user/:id', UserController.get);
      this.router.get('/rest/user/', UserController.index);
      this.router.post('/rest/user/', UserController.create);
      this.router.delete('/rest/user/:id', UserController.delete);

      app
        .use(this.router.routes())
        .use(this.router.allowedMethods());


    }
}
