import chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import liftApp from '../../server';
chai.should();
global.sinon = sinon;
before(async (done) => {
  let app = await liftApp();
  global.app = app;
  global.request =
    request.agent(app.listen());
  done();
});
