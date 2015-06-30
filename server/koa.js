'use strict';

import path from 'path';
import debug from 'debug';

import koa from 'koa';
import jade from 'koa-jade';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import favicon from 'koa-favicon';
import staticCache from 'koa-static-cache';
import responseTime from 'koa-response-time';
import koaBodyParser from 'koa-bodyparser';

import cors from 'koa-cors';

import isomorphicRouter from './router';
import bootstrap from './bootstrap';

import config from './config/init';


import Models from './models';
import Controllers from './controllers';
import Services from './services';



const env = process.env.NODE_ENV || 'development';
const app = koa();


app.use(cors());
app.use(koaBodyParser());


// sessions
var session = require('koa-generic-session')
app.keys = ['your-session-secret']
app.use(session())


// authentication
require('./auth')
var passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())




// setup rest models
global.models = (new Models()).getDb();

// add header `X-Response-Time`
app.use(responseTime());
app.use(logger());

// various security headers
app.use(helmet.defaults());

if (env === 'production') {
  // set debug env to `koa` only
  // must be set programmaticaly for windows
  debug.enable('koa');

  // load production middleware
  app.use(require('koa-conditional-get')());
  app.use(require('koa-etag')());
  app.use(require('koa-compressor')());

  // Cache pages
  const cache = require('lru-cache')({maxAge: 3000});
  app.use(require('koa-cash')({
    get: function* (key) {
      return cache.get(key);
    },
    set: function* (key, value) {
      cache.set(key, value);
    }
  }));
}

if (env === 'development') {
  // set debug env, must be programmaticaly for windows
  debug.enable('dev,koa');
  // log when process is blocked
  require('blocked')((ms) => debug('koa')(`blocked for ${ms}ms`));
}

app.use(favicon(path.join(__dirname, '../app/images/favicon.ico')));

app.use(jade.middleware({
  debug: true,
  pretty: true,
  viewPath: path.join(__dirname, '/views')
}));


// setup rest router
var services = new Services();

global.services = services;

var controllers = new Controllers(app, passport);
controllers.setupPublicRoute()
controllers.setupAppRoute()




const cacheOpts: Object = {maxAge: 86400000, gzip: true};

// Proxy asset folder to webpack development server in development mode
if (env === 'development') {
  var webpackConfig: Object = require('./../webpack/dev.config');
  app.use(mount('/assets', require('koa-proxy')({ host: `http://localhost:${webpackConfig.server.port}` })));
}
else {
  app.use(mount('/assets', staticCache(path.join(__dirname, '../dist'), cacheOpts)));
}



app.use(isomorphicRouter);



var liftApp = async () => {


  await models.sequelize.sync({force: config.connection.force})

  await bootstrap();
  app.listen(config.port);

  if (process.send) process.send('online');
  debug('koa')(`Application started on port ${config.port}`);

  return app;

}

if (env !== 'test') liftApp();

module.exports = liftApp
