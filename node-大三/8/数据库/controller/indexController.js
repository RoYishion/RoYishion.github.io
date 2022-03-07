const indexService = require('../service/indexService');
const fs = require('fs');

var isRoot = true;
var allFilePaths = [];
const documentRoot = 'D:/project/node';

module.exports = {
  index: async(ctx, next) => {
    await ctx.render('index', {
      title: 'Hello Koa MVC!'
    })
  },
  login: async(ctx, next) => {
    await ctx.render('login')
  },
  logout: async(ctx, next) => {
    ctx.session.username = null;
    await ctx.render('login');
  },
  checkLogin: async(ctx, next) => {
    const {phone, password} = ctx.request.body;
    let user = await indexService.checkLogin(phone, password);
    if(user) {
      ctx.session.username = user.username;
      ctx.response.redirect('/home');
    } else {
      await ctx.render('login', {
        info: '账号或密码错误'
      });
    }
  },
  home: async(ctx, next) => {
    await ctx.render('homeIndex', {
      user: ctx.session.username
    });
  },
  fileView: async(ctx, next) => {
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
          fatherPath = reqFileUrl.replace(/\//g, "%2F");  // 给路径加上前缀
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
    }
}

async function findAllFilePath(filePath) {
  let files = await fs.promises.readdir(filePath);  // 获取filepath中的所有子文件和子目录
  for(let i=0; i<files.length; i++) {
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