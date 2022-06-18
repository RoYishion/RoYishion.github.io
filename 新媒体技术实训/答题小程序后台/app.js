const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const passport = require('./middleware/passport');
const cors = require('koa2-cors');

const user = require('./routes/apis/user');
const roles = require('./routes/apis/roles');
const score = require('./routes/apis/score');
const relation = require('./routes/apis/relation');
const session = require('koa-session');
const baseConfig = require('./config/base-config');
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(cors(baseConfig.cors));

app.use(views(__dirname + '/views', {
  map: { html: 'nunjucks' }
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// session
app.keys = ['secret'];
app.use(session(baseConfig.session, app));

// 使用passport中间件
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(user.routes(), user.allowedMethods());
app.use(roles.routes(), roles.allowedMethods());
app.use(score.routes(), roles.allowedMethods());
app.use(relation.routes(), roles.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app