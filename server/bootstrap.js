'use strict';
import models from './models';

export default function (cb) {

  console.log("=== run bootstrap ===");

  models.User.create({username: 'testUser'}).then(function(result){
    return cb();
  });




}
