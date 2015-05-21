'use strict';

export default async (cb) => {

  console.log("=== run bootstrap ===");
  let picture = {
    "large":"http://api.randomuser.me/portraits/women/72.jpg",
    "medium":"http://api.randomuser.me/portraits/med/women/72.jpg",
    "thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"
  }

  let testUser = {
    "username":"smlsun",
    "password":"smlsun",
    "gender":"male",
    "email":"smlsun@smlsun.com",
    "phone":"(951)-385-6121",
    "cell":"(657)-919-3511",
    "picture":JSON.stringify(picture)
  }


  let result = null;
  try {

    result = await models.User.create(testUser)
    console.log("=== bootstrap result ===", result.dataValues.id);

  } catch (e) {

    console.log("error", e);

  }
}
