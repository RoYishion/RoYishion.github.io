'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const counter = app.middleware.counter();  // 定义中间件
  router.get('/', controller.home.index);
  router.get('/a', controller.home.a);
  router.get('/hanhan', counter, controller.hanhan.index);  // 第二个参数使用中间件
  router.get('/b', controller.hanhan.b);

  // get请求传参
  router.get('/bb', controller.hanhan.bb);
  router.get('/c/:name/:age', controller.hanhan.c);

  router.get('/testHanhanService', controller.home.testHanhanService);

  router.post('/add', controller.hanhan.add);
  router.post('/sub', controller.hanhan.sub);
  router.post('/editor', controller.hanhan.editor);
  router.post('/show', controller.hanhan.show);
  router.get('/newContext', controller.hanhan.newContext);
  router.post('/newContext', controller.hanhan.newContext);

  router.post('/newRequest', controller.hanhan.newRequest);
  router.get('/newResponse', controller.hanhan.newResponse);

  
};