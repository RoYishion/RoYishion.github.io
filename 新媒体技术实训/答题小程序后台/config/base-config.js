'use strict'
// 基础配置
module.exports = {
  session: {
    key: 'koa:666',  // cookie key
    maxAge: 9999999999,  // cookie过期时间
    overwrite: true,  // 是否可以overwrite
    httpOnly: true,  // cookie是否只有服务器端可以访问
    signed: true,  // 签名
    rolling: false,  // 在每次请求时强行设置cookie，重置过期时间(默认false)
    renew: false  // 当session存在的时候重置session
  },
  cors: {
    origin: function (ctx) {
      const whiteList = ['https://localhost:8080'];
      console.log('host  ' + ctx.request.url);
      console.log('referer  ' + ctx.header.referer);
      let url = ctx.request.url;
      if (ctx.header.referer) {
        url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
      }
      if (whiteList.includes(url)) {
        console.log('判断正确');
        return url;
      }
    },
    maxAge: 5,
    credential: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaer: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeader: ['WWW-Authenticate', 'Server-Authorization']
  },
  jwt: {
    secretKey: 'myAppToken',
    tokenExpiresTime: 1000 * 60 * 60 * 2
  }
}