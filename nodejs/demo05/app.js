/*
  1. fs.stat 检测是文件还是目录
  2. fs.mkdir 创建目录
  3. fs.writeFile 创建写入文件
  4. fs.appendFile 追加文件
  5. fs.readFile 读取文件
  6. fs.readdir 读取目录
  7. fs.rename 重命名
  8. fs.rmdir 删除目录
  9. fs.unlink 删除文件
*/

const fs = require('fs');

// 1. fs.stat 检测是文件还是目录
/*
fs.stat('./html', (err, data) => {
  if(err) {
    console.log(err);
    return;
  }

  console.log(`是文件：${data.isFile()}`);
  console.log(`是目录：${data.isDirectory()}`);
})

fs.stat('./package.json', (err, data) => {
  if(err) {
    console.log(err);
    return;
  }

  console.log(`是文件：${data.isFile()}`);
  console.log(`是目录：${data.isDirectory()}`);
})
*/

// 2. fs.mkdir 创建目录
/*
  path  将创建的目录路径
  mode 目录权限（读写权限），默认777
  callback 回调，传递异常参数err
*/
/*
fs.mkdir('./css', (err) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log('创建成功');
})
*/

// 3. fs.writeFile 创建写入文件，若文件已存在，会被新文件替换
/*
fs.writeFile('./html/index.html', '你好nodejs', (err) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log('创建写入文件成功');
})
*/

// 4. fs.appendFile 追加文件，若文件已存在，会把内容写在原文件后面
/*
fs.appendFile('./css/bass.css', 'body{color: red}', (err) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log('追加文件成功');
})
*/

// 5. fs.readFile 读取文件
/*
fs.readFile('./css/bass.css', (err, data) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(data.toString());
})
*/

//  6. fs.readdir 读取目录
fs.readdir('./html', (err, data) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log(data);
})