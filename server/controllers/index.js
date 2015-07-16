
import UserController from './user';
import BeanController from './bean';
import PostController from './post';
import AuthController from './auth';

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
        let ctx = this
        yield passport.authenticate('local', function*(err, user, info) {
          if (err) throw err
          if (user === false) {
            ctx.status = 401
            ctx.body = { success: false }
          } else {
            yield ctx.logIn(user);
            ctx.body = { success: true }
          }
        }).call(this, next)
      });

      publicRoute.get('/auth/login_easy',
        passport.authenticate('local', {
          successRedirect: '/',
          failureRedirect: '/auth/login'
        })
      )

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
      this.router.delete('/rest/user/:id', UserController.delete);

      this.app.use(this.router.middleware())


    }
}
