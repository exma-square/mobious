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

  let newBeanBlack = {
    name: '黑珍珠',
    place: '哥斯大黎加 Costa Rica',
    breed: '卡杜拉 Caturra；卡杜艾 Catuai',
    manor: '查孔自家農場',
    method: '自然處理法;「黑珍珠」',
    roastDate: '2014年',
    roastType: '烘焙度',
    flavour: '風味',
    lat: 25.0339031,
    lon: 121.5645099,
    coverUrl: '',
    thumbCoverUrl: ''
  }

  let newBeanWhite = {
    name: '白珍珠',
    place: '哥斯大黎加 Costa Rica',
    breed: '卡杜拉 Caturra；卡杜艾 Catuai',
    manor: '查孔自家農場',
    method: '自然處理法;「黑珍珠」',
    roastDate: '2014年',
    roastType: '烘焙度',
    flavour: '風味',
    lat: 25.0339031,
    lon: 121.5645099,
    coverUrl: '',
    thumbCoverUrl: ''
  }



  try {

    await models.User.create(testUser)
    await models.Bean.create(newBeanBlack)
    await models.Bean.create(newBeanWhite)


  } catch (e) {

    console.log("error", e);

  }
}
