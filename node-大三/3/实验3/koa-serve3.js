const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());

app.use(koaNunjucks({
  ext: 'html',  // 使用HTML后缀的模板
  path: path.join(__dirname, 'views'),  // 模板所在路径
  nunjucksConfig: {  // nunjucks的配置
    trimBlocks: true
  }
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen('3010', (err) => {
  if(err) {
    console.log('koa服务器启动失败');
  } else {
    console.log('koa服务器启动成功，地址为：http://localhost:3010');
  }
})

router.get('/', (ctx, next) => {
  ctx.body = '<h1>Hello Koa server</h1>';
})

router.get('/login', async(ctx, next) => {
  await ctx.render('login');
})

router.post('/checkLogin', async(ctx, next) => {
  const {username, password} = ctx.request.body;
  console.log(username + "-----" + password);
  if(checkUser(username, password)) {
    await ctx.render('home', {
      user: username,
      info: '登陆成功'
    });
  } else {
    await ctx.render('login', {
      info: '账号密码错误'
    });
  }
})

const users = new Map([['tom', '123456'], ['jack', '654321']])
function checkUser(username, password) {
  let userDataPs = users.get(username);
  if(userDataPs) {
    if(userDataPs == password) {
      return true;
    }
  }
  return false;
}