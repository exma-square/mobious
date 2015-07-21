'use strict';

export default async (cb) => {

  let picture = {
    "large":"http://api.randomuser.me/portraits/women/72.jpg",
    "medium":"http://api.randomuser.me/portraits/med/women/72.jpg",
    "thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"
  }

  let visitorUser = {
    "username":"visitor",
    "password":"visitor",
    "gender":"male",
    "email":"visitor@visitor.com",
    "phone":"(951)-385-6121",
    "cell":"(657)-919-3511",
    "picture":JSON.stringify(picture)
  }


  let editorUser = {
    "username":"editor",
    "password":"editor",
    "gender":"male",
    "email":"editor@editor.com",
    "phone":"(951)-385-6121",
    "cell":"(657)-919-3511",
    "picture":JSON.stringify(picture)
  }

  let adminUser = {
    "username":"admin",
    "password":"admin",
    "gender":"male",
    "email":"admin@admin.com",
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

  let testPost1 = {
    title: '這是一篇文章',
    tags: '西捨',
    content: '西捨帥帥'
  }

  let testPost2 = {
    title: '這是兩篇文章',
    tags: '蹤影',
    content: '蹤影帥帥'
  }

  let Comment1 = {
    author: '西捨',
    content: '我也這麼認為'
  }

  let Comment2 = {
    author: 'Rick',
    content: '感謝大大無私分享'
  }

  let Comment3 = {
    author: '是叉貓',
    content: '肥宅4ni'
  }

  let adminRole = {
    authority: 'admin'
  };

  let editorRole = {
    authority: 'editor'
  };


  try {
    let createdVisitor = await models.User.create(visitorUser);
    let createdEditor = await models.User.create(editorUser);
    let createdAdmin = await models.User.create(adminUser);

    let createdEditorRole = await models.Role.create(editorRole);
    let createdAdminRole = await models.Role.create(adminRole);

    await createdEditor.setRoles(createdEditorRole);
    await createdAdmin.setRoles(createdAdminRole);

    await models.Bean.create(newBeanBlack);
    await models.Bean.create(newBeanWhite);

    let createdPost1 = await models.Post.create(testPost1);
    let createdPost2 = await models.Post.create(testPost2);

    let createdCom1 = await models.Comment.create(Comment1);
    let createdCom2 = await models.Comment.create(Comment2);
    let createdCom3 = await models.Comment.create(Comment3);


  } catch (e) {

    console.log("error", e);

  }
}
