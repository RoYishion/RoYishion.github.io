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
  }
}