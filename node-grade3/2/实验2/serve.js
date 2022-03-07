var http = require('http');  // 获取http模块
var fs = require('fs');  // 获取fs模块
const hostname = '127.0.0.1';
const port = 3010;
var documentRoot = 'D:/project/node/lesson';

var server = http.createServer();  // 创建服务器
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var handRequest = function (req, res) {
  let urlname = req.url;  // 接受请求的url
  if (urlname == '/') {
      fs.readdir(documentRoot, function (err, files) {
        if (err) {
          console.log('files err');
          res.writeHeader(404, {
            'content-type': 'text/html;charset="utf-8"'
          });
          res.write('<h1>文件读取错误</h1>');
          res.end();
        } else {
          res.writeHeader(200, {
            'content-type': 'text/html;charset="utf-8"'
          });
          for (let i = 0; i < files.length; i++) {
            res.write(files[i]);
            res.write('<br>');
          }
          res.end();
        }
      });
    } else {
    res.writeHeader(404, {
      'content-type': 'text/html;charset="utf-8"'
    });
    res.write('没有该路径可以访问');
    res.end();
  }
};

server.on('request', handRequest)