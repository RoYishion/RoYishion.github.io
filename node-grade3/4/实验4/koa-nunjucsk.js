const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');
const fs = require('fs');

const documentRoot = 'D:/project/node';

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());

app.use(koaNunjucks({  // 配置模板
  ext: 'html',  // 使用HTML后缀的模板
  path: path.join(__dirname, 'views'),  // 模板所在路径
  nunjucksConfig: {  // nunjucks的配置
    trimBlocks: true  // 开启转义，防止攻击
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
  ctx.body = '<h1>Hello Koa server</h1>';  // ctx.body 输出到网页
})

router.get('/login', async(ctx, next) => {
  await ctx.render('login');  // 渲染login模板
})

router.get('/home', async(ctx, next) => {
  await ctx.render('homeIndex');
})

router.get('/userManage', async(ctx, next) => {
  await ctx.render('userManage');
})

router.post('/checkLogin', async(ctx, next) => {
  const {username, password} = ctx.request.body;
  console.log(username + "-----" + password);
  if(checkUser(username, password)) {
    await ctx.render('homeIndex', {
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

var isRoot = true;
var allFilePaths = [];
router.get('/fileView', async(ctx, next) => {
  allFilePaths = [];
  await findAllFilePath(documentRoot);
  console.log(allFilePaths);
  let {reqFileUrl} = ctx.request.query;
  console.log(reqFileUrl);
  let files = null;
  if(reqFileUrl) {
    if(allFilePaths.indexOf(documentRoot + reqFileUrl) != -1) {  // 请求的路径在allFilePaths能被找到
      console.log('子目录');
      isRoot = false;
      files = await fs.promises.readdir(documentRoot + reqFileUrl);  // 读取
    } else {
      await ctx.render('404');
      return false;
    }
  } else {
    console.log('根目录');
    isRoot = true;
    files = await fs.promises.readdir(documentRoot);
  }
  console.log(files);

  let viewFiles = [];
  let file_stats = null;
  for(let i=0;i<files.length;i++) {
    if(isRoot) {
      file_stats = await fs.promises.stat(documentRoot + '/' + files[i]);
    } else {
      file_stats = await fs.promises.stat(documentRoot + reqFileUrl + '/' + files[i]);
    }
    if(file_stats.isDirectory()) {
      let fatherPath = '';
      if(reqFileUrl) {
        fatherPath = reqFileUrl.replace(/\//g, "%2F")  // 给路径加上前缀
      }
      viewFiles.push({
        filename: files[i],
        isDirectory: true,
        filePath: fatherPath + "%2F" + files[i]
      })
    } else {
      viewFiles.push({
        filename: files[i],
        isDirectory: false,
        filePath: ''
      })
    }
  }

  let upPath = '';
  if(reqFileUrl) {
    upPath = reqFileUrl.substring(0, reqFileUrl.lastIndexOf("/"));  // 截取上级路径
  }
  await ctx.render('fileView', {
    viewFiles: viewFiles,
    isRoot: isRoot,
    upPath: upPath
  });
  return true;
})

async function findAllFilePath(filePath) {
  let files = await fs.promises.readdir(filePath);  // 获取filepath中的所有子文件和子目录
  for(let i=0;i<files.length;i++) {
    let file_stats = await fs.promises.stat(filePath + '/' + files[i]);  // 获取filepath中的每一个子文件和子目录的状态信息
    if(file_stats.isDirectory()) {  // 如果是文件夹
      allFilePaths.push(filePath + '/' + files[i]);
      console.log(filePath + '/' + files[i]);
      await findAllFilePath(filePath + '/' + files[i]);  // 回调执行：
    }
    if(i == files.length-1) {  // 所有文件和目录读取完成
      return true;
    }
  }
}