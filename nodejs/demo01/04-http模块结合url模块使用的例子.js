const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  //http://127.0.0.1?name=zhangsan&age=20  // 想获取url传过来的name和age 

  res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
  // 设置响应头，状态码200，文件类型是html，字符集是utf-8

  console.log(req.url);  // 获取浏览器访问的地址

  if(req.url != 'favicon.ico') {
    var userinfo = url.parse(req.url, true).query;
    console.log(`姓名：${userinfo.name}--年龄：${userinfo.age}`);
  }

  res.end();  // 结束响应

}).listen(8081);