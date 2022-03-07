'use strict';

const { app } = require('egg-mock/bootstrap');

// 单元测试
describe('hanhan index', () => { // 两个参数，第一个为单元测试的描述，第二个参数为回调函数，里面写要测试的东西
  it('hanhan index', () => { // 两个参数，第一个为单元测试的结果，第二个参数为回调函数，里面写请求路径
    return app.httpRequest()
      .get('/hanhan') // 发送请求
      .expect(200) // 希望得到的返回结果
      .expect("<h1>I'm your father</h1>"); // 希望得到的返回结果
  });

  it('RoYishion', async () => {
    return app.httpRequest()
      .get('/b')
      .expect(200)
      .expect('<h1>哈哈</h1>'); // 希望得到的返回结果
  });
});