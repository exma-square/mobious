"use strict";
/**
 * Dependencies
 */

describe("bean", () => {

  before((done)=>{
    sinon.stub(controllers, 'isAuthenticated', (app) =>{
      return true
    });
    done();
  });

  after((done) =>{
    controllers.isAuthenticated.restore();
    done();
  });


  it("index all bean", (done) => {

    request.get("/rest/bean/")
    .expect(200)
    .end((error, res) => {
      let beans = res.body.beans;

      beans.should.be.Array;
      beans[0].id.should.greaterThan(0);

      done(error);
    });

  });


});
