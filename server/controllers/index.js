import UserController from './user';
import BeanController from './bean';
import PostController from './post';
import AuthController from './auth';
import CommentController from './comment';
import RoleController from './role';

import Router from 'koa-router';
import fs from 'fs';
import path from 'path';


export default class Routes {

    constructor (app, passport) {
      var router = new Router();
      this.router = router;
      this.app = app;
      this.passport = passport;

    }

    setupPublicRoute() {
      var app = this.app;
      var passport = this.passport;

      let assets;
      if (process.env.NODE_ENV === 'development') {
        assets = fs.readFileSync(path.resolve(__dirname, '../webpack-stats.json'));
        assets = JSON.parse(assets);
      }
      else {
        assets = require('../webpack-stats.json');
      }

      var publicRoute = new Router()

      publicRoute.get('/auth/login', function*() {
        this.render('login', {assets})
      })

      publicRoute.post('/auth/login', function*(next) {
        let ctx = this;
        yield passport.authenticate('local', function*(err, user, info) {
          if (err) throw err
          if (user === false) {
            ctx.status = 401
            ctx.body = { loginMessage: 'fail' }
          }else if (user.activated === false) {
            ctx.status = 401
            ctx.body = { loginMessage: 'activated' }
          } else {
            console.log('OPPPPPPS');
            yield ctx.logIn(user);
            let authStatus = services.user.getAuthStatus(ctx);
            ctx.body = { authStatus: authStatus, loginMessage: 'success' }
          }
        }).call(this, next)
      });


      publicRoute.get('/auth/status', AuthController.status);

      publicRoute.get('/logout', function*(next) {
        this.logout()
        this.redirect('/')
      })

      publicRoute.get('/auth/facebook',
        passport.authenticate('facebook')
      )

      publicRoute.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
          successRedirect: '/',
          failureRedirect: '/auth/login'
        })
      )

      publicRoute.get('/rest/user/:id', UserController.get);
      publicRoute.get('/rest/user/', UserController.index);
      publicRoute.get('/rest/bean/', BeanController.index);
      publicRoute.get('/rest/post/', PostController.index);
      publicRoute.get('/rest/comment/', CommentController.index);
      publicRoute.get('/rest/post/:id', PostController.get);
      publicRoute.get('/rest/auth/status', AuthController.status);
      publicRoute.post('/rest/post/', PostController.create);
      publicRoute.post('/rest/post/fileUpload/', PostController.upload);
      publicRoute.post('/rest/comment/', CommentController.create);
      publicRoute.get('/rest/role/:attribute', RoleController.get);


      app.use(publicRoute.middleware())

      var that = this;

      app.use(function*(next) {
        if (true || services.user.isAuthenticated(this)) {
          yield next
        } else {
          this.redirect('/auth/login')
        }
      })

    }

    setupAppRoute() {

      this.router.post('/rest/user/', UserController.create);
      this.router.post('/rest/role/', RoleController.create);
      this.router.put('/rest/post/updateEditor/:id', PostController.updateEditor);
      this.router.put('/rest/post/:id', PostController.update);
      this.router.put('/rest/user/activated/:id', UserController.updateActivated);
      this.router.put('/rest/user/resetPasswordByAdmin/:id', UserController.resetPasswordByAdmin);
      this.router.delete('/rest/user/:id', UserController.delete);
      this.router.delete('/rest/post/:id', PostController.delete);

      this.app.use(this.router.middleware())


    }
}
