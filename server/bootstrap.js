'use strict';
import models from './models';

export default async (cb) => {

  console.log("=== run bootstrap ===");

  var result = await models.User.create({username: 'testUser'})

  console.log("=== bootstrap result ===", result.dataValues.id);

  return cb();

}
