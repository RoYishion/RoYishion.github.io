const Koa = require('koa');
const KoaRouter = require('koa-router');
const views = require('koa-views')

const app = new Koa();
const router = new KoaRouter();

app.use(views(__dirname + '/views', {
  extension: 'html'
}))
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

router.get('/login', (ctx, next) => {
  ctx.res.writeHead(200, {
    'content-type': 'text/html;charset="utf-8"'
  });
  ctx.res.write("我这里登陆<br>");
  ctx.res.write("用户名：<input type='text' name=''username>");
  ctx.res.end();
})

router.get('/home', async(ctx, next) => {
  await ctx.render('home');
})