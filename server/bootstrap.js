'use strict';

export default async (cb) => {

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

  let testPost = {
    title: '這是一篇文章',
    tags: '西捨',
    content: '西捨帥帥'
  }

  let testPost2 = {
    title: '這是兩篇文章',
    tags: '蹤影',
    content: '蹤影帥帥'
  }


  //建立新的 post，該 post 的建立者是 testUser

  try {

    await models.User.create(testUser)
    await models.Bean.create(newBeanBlack)
    await models.Bean.create(newBeanWhite)
    await models.Post.create(testPost)
    await models.Post.create(testPost2)

  } catch (e) {

    console.log("error", e);

  }
}
