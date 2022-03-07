const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const index = require('./routes/index');
const users = require('./routes/users');
const session = require('koa-session');
// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  // extension: 'nunjucks'
  map: {html: 'nunjucks'}
}))

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.keys = ['secret'];
const CONFIG = {
  key: 'koa:666',  // cookie key
  maxAge: 9999999999,  // cookie过期时间
  overwrite: true,  // 是否可以overwrite
  httpOnly: true,  // cookie是否只有服务器端可以访问
  signed: true,  // 签名
  rolling: false,  // 在每次请求时强行设置cookie，重置过期时间(默认false)
  renew: false  // 当session存在的时候重置session
};
app.use(session(CONFIG, app));

module.exports = app;