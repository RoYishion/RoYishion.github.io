var fs = require('fs');  // 获取fs模块
var documentRoot = 'D:/project/node/lesson';
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
  path: path.join(__dirname),  // 模板所在路径
  nunjucksConfig: {  // nunjucks的配置
    trimBlocks: true
  }
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen('3020', (err) => {
  if (err) {
    console.log('koa服务器启动失败');
  } else {
    console.log('koa服务器启动成功，地址为：http://localhost:3020');
  }
})

router.get('/', async(ctx, next) => {
  await ctx.render('index.html', {});
  let urlname = ctx.url;
  if (urlname == '/') {
    await fs.readdir(documentRoot, function (err, files) {
      if (err) {
        console.log('files err');
        console.log('<h1>文件读取错误</h1>');
      } else {
        for (let i = 0; i < files.length; i++) {
          console.log(files[i]);
        }
      }
    });
  } else {
    await console.log('没有该路径可以访问');
  }
})