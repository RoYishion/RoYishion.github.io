'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/a', controller.home.a);
  router.get('/hanhan', controller.hanhan.index);
  router.get('/b', controller.hanhan.b);

  // get请求传参
  router.get('/bb', controller.hanhan.bb);
  router.get('/c/:name/:age', controller.hanhan.c);
  
  // post请求传参
  router.post('/add', controller.hanhan.add);

  router.get('/testHanhanService', controller.home.testHanhanService);
};